import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async logAction(data: {
    tenantId?: string;
    userId?: string;
    module: string;
    action: string;
    entityId?: string;
    entityType?: string;
    oldValue?: any;
    newValue?: any;
    ipAddress?: string;
    userAgent?: string;
    metadata?: any;
  }) {
    try {
      return await this.prisma.auditLog.create({
        data: {
          tenantId: data.tenantId,
          userId: data.userId,
          module: data.module,
          action: data.action,
          entityId: data.entityId,
          entityType: data.entityType,
          oldValue: data.oldValue ? JSON.parse(JSON.stringify(data.oldValue)) : undefined,
          newValue: data.newValue ? JSON.parse(JSON.stringify(data.newValue)) : undefined,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          metadata: data.metadata ? JSON.parse(JSON.stringify(data.metadata)) : undefined,
        },
      });
    } catch (err) {
      console.warn('[AuditLog] Failed to log action:', err);
    }
  }

  async getAllLogs(tenantId?: string, options?: { page?: number; limit?: number; module?: string; search?: string }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (tenantId) where.tenantId = tenantId;
    if (options?.module) where.module = options.module;

    if (options?.search) {
      where.OR = [
        { action: { contains: options.search, mode: 'insensitive' } },
        { module: { contains: options.search, mode: 'insensitive' } },
        { entityType: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
