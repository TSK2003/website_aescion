import { Injectable, NotFoundException } from '@nestjs/common';
import { CrmRepository } from './crm.repository';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class CrmService {
  constructor(
    private readonly crmRepo: CrmRepository,
    private readonly emailService: EmailService,
  ) {}

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
    const lead = await this.crmRepo.createLead({
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

    // Send Thank You email to user
    const userHtml = `
      <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f8fafc; border-radius: 12px;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border-top: 4px solid #2563eb;">
          <h2 style="color: #1e293b; font-size: 24px; font-weight: 700; margin-bottom: 24px; text-align: center;">Thank You for Reaching Out!</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">Hi ${dto.firstName},</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Thank you for contacting <strong>AESCION</strong>. We have received your inquiry and our technology team is currently reviewing your request.</p>
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="color: #334155; font-size: 14px; margin: 0 0 8px 0;"><strong>Inquiry Details:</strong></p>
            <p style="color: #475569; font-size: 14px; margin: 0;">We'll get back to you at <em>${dto.email}</em> within 24-48 business hours to discuss how we can assist you with your technology requirements.</p>
          </div>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">If you have any urgent questions, feel free to reply directly to this email.</p>
          <div style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
            <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">Best Regards,</p>
            <p style="color: #3b82f6; font-size: 16px; font-weight: 600; margin: 4px 0 0 0;">The AESCION Team</p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 16px;">&copy; ${new Date().getFullYear()} AESCION Enterprise Software Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;
    await this.emailService.sendEmail(dto.email, 'Thank you for your Enquiry - Aescion', userHtml);

    // Send Notification to Super Admin
    const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'contact.aescion@gmail.com';
    const adminHtml = `
      <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f8fafc; border-radius: 12px;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-top: 4px solid #f59e0b;">
          <h2 style="color: #1e293b; font-size: 20px; font-weight: 700; margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">New Lead Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 120px;">Name:</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">${dto.firstName} ${dto.lastName}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Email:</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;"><a href="mailto:${dto.email}" style="color: #2563eb;">${dto.email}</a></td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Phone:</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">${dto.phone || 'N/A'}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Source:</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">${dto.source}</td></tr>
            <tr><td style="padding: 12px 0; color: #64748b; vertical-align: top;">Requirement:</td><td style="padding: 12px 0; color: #0f172a; font-weight: 500; white-space: pre-wrap;">${dto.requirement || 'N/A'}</td></tr>
          </table>
          <div style="margin-top: 32px; padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
            <p style="color: #166534; font-size: 14px; margin: 0;">This lead has been automatically logged into the CRM system.</p>
          </div>
        </div>
      </div>
    `;
    await this.emailService.sendEmail(adminEmail, `New Lead from ${dto.firstName}`, adminHtml);

    return lead;
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
