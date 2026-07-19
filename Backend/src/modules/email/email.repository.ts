import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class EmailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTemplates(tenantId: string) {
    return this.prisma.emailTemplate.findMany({ where: { tenantId } });
  }

  async getLogs(tenantId: string) {
    return this.prisma.emailLog.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
