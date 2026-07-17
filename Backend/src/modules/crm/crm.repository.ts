import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CrmRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllLeads(tenantId: string, options?: {
    stage?: string;
    source?: string;
    priority?: string;
    ownerId?: string;
    skip?: number;
    take?: number;
    search?: string;
  }) {
    const where: Prisma.LeadWhereInput = {
      tenantId,
      deletedAt: null,
      ...(options?.stage && { stage: options.stage as any }),
      ...(options?.source && { source: options.source as any }),
      ...(options?.priority && { priority: options.priority as any }),
      ...(options?.ownerId && { ownerId: options.ownerId }),
      ...(options?.search && {
        OR: [
          { firstName: { contains: options.search, mode: 'insensitive' as const } },
          { lastName: { contains: options.search, mode: 'insensitive' as const } },
          { email: { contains: options.search, mode: 'insensitive' as const } },
          { company: { contains: options.search, mode: 'insensitive' as const } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.lead.findMany({
        where,
        include: { owner: { select: { id: true, firstName: true, lastName: true, email: true } } },
        skip: options?.skip,
        take: options?.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { data, total };
  }

  async findLeadById(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, firstName: true, lastName: true, email: true } },
        activities: { orderBy: { createdAt: 'desc' }, take: 20 },
        notes: { orderBy: { createdAt: 'desc' } },
        tasks: { orderBy: { dueDate: 'asc' } },
      },
    });
  }

  async createLead(data: Prisma.LeadCreateInput) {
    return this.prisma.lead.create({ data });
  }

  async updateLead(id: string, data: Prisma.LeadUpdateInput) {
    return this.prisma.lead.update({ where: { id }, data });
  }

  async softDeleteLead(id: string, deletedBy: string) {
    return this.prisma.lead.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy },
    });
  }

  async addActivity(data: Prisma.LeadActivityCreateInput) {
    return this.prisma.leadActivity.create({ data });
  }

  async addNote(data: Prisma.LeadNoteCreateInput) {
    return this.prisma.leadNote.create({ data });
  }

  async addTask(data: Prisma.LeadTaskCreateInput) {
    return this.prisma.leadTask.create({ data });
  }

  async completeTask(taskId: string) {
    return this.prisma.leadTask.update({
      where: { id: taskId },
      data: { isCompleted: true, completedAt: new Date() },
    });
  }

  async getPipelineStats(tenantId: string) {
    const stages = await this.prisma.lead.groupBy({
      by: ['stage'],
      where: { tenantId, deletedAt: null },
      _count: { id: true },
    });
    return stages.map(s => ({ stage: s.stage, count: s._count.id }));
  }

  async getLeadSourceStats(tenantId: string) {
    const sources = await this.prisma.lead.groupBy({
      by: ['source'],
      where: { tenantId, deletedAt: null },
      _count: { id: true },
    });
    return sources.map(s => ({ source: s.source, count: s._count.id }));
  }
}
