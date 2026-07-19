import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats(tenantId: string) {
    // In a real app, you would aggregate these from different tables
    const totalLeads = await this.prisma.lead.count({
      where: { tenantId, deletedAt: null },
    });
    const pendingApps = await this.prisma.application.count({
      where: { tenantId, status: 'SUBMITTED', deletedAt: null },
    });
    const publishedBlogs = await this.prisma.blog.count({
      where: { tenantId, status: 'PUBLISHED', deletedAt: null },
    });

    return {
      totalLeads,
      pendingApps,
      publishedBlogs,
      systemHealth: 'Optimal',
    };
  }

  async getRecentActivities(tenantId: string) {
    return this.prisma.auditLog.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}
