import { Injectable, NotFoundException } from '@nestjs/common';
import { CrmRepository } from './crm.repository';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class CrmService {
  constructor(private readonly crmRepo: CrmRepository) {}

  async getAllLeads(
    tenantId: string,
    options: {
      page?: number;
      limit?: number;
      stage?: string;
      source?: string;
      priority?: string;
      ownerId?: string;
      search?: string;
    },
  ) {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const result = await this.crmRepo.findAllLeads(tenantId, {
      ...options,
      skip,
      take: limit,
    });

    return {
      items: result.data,
      meta: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
      },
    };
  }

  async getLeadById(id: string) {
    const lead = await this.crmRepo.findLeadById(id);
    if (!lead) throw new NotFoundException(`Lead "${id}" not found`);
    return lead;
  }

  async createLead(tenantId: string, dto: CreateLeadDto, userId: string) {
    return this.crmRepo.createLead({
      tenant: { connect: { id: tenantId } },
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      company: dto.company,
      designation: dto.designation,
      source: dto.source as any,
      priority: dto.priority as any,
      requirement: dto.requirement,
      createdBy: userId,
    });
  }

  async updateLead(id: string, dto: UpdateLeadDto, userId: string) {
    await this.getLeadById(id);
    return this.crmRepo.updateLead(id, { ...dto, updatedBy: userId } as any);
  }

  async deleteLead(id: string, userId: string) {
    await this.getLeadById(id);
    return this.crmRepo.softDeleteLead(id, userId);
  }

  async updateStage(id: string, stage: string, userId: string) {
    const lead = await this.getLeadById(id);
    const oldStage = lead.stage;

    await this.crmRepo.updateLead(id, {
      stage: stage as any,
      updatedBy: userId,
    });
    await this.crmRepo.addActivity({
      lead: { connect: { id } },
      user: { connect: { id: userId } },
      type: 'stage_change',
      description: `Pipeline stage changed from ${oldStage} to ${stage}`,
    });

    return this.getLeadById(id);
  }

  async addNote(leadId: string, content: string, userId: string) {
    await this.getLeadById(leadId);
    return this.crmRepo.addNote({
      lead: { connect: { id: leadId } },
      user: { connect: { id: userId } },
      content,
    });
  }

  async addTask(
    leadId: string,
    title: string,
    description: string,
    dueDate?: Date,
  ) {
    await this.getLeadById(leadId);
    return this.crmRepo.addTask({
      lead: { connect: { id: leadId } },
      title,
      description,
      dueDate,
    });
  }

  async getPipelineStats(tenantId: string) {
    return this.crmRepo.getPipelineStats(tenantId);
  }

  async getLeadSourceStats(tenantId: string) {
    return this.crmRepo.getLeadSourceStats(tenantId);
  }
}
