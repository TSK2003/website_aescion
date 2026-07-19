import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    tenantId: string,
    options?: {
      type?: string;
      status?: string;
      assigneeId?: string;
      search?: string;
      skip?: number;
      take?: number;
    },
  ) {
    const where: Prisma.ApplicationWhereInput = {
      tenantId,
      deletedAt: null,
      ...(options?.type && { type: options.type as any }),
      ...(options?.status && { status: options.status as any }),
      ...(options?.assigneeId && { assigneeId: options.assigneeId }),
      ...(options?.search && {
        OR: [
          {
            firstName: {
              contains: options.search,
              mode: 'insensitive' as const,
            },
          },
          {
            lastName: {
              contains: options.search,
              mode: 'insensitive' as const,
            },
          },
          { email: { contains: options.search, mode: 'insensitive' as const } },
          {
            position: {
              contains: options.search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.application.findMany({
        where,
        include: {
          assignee: { select: { id: true, firstName: true, lastName: true } },
        },
        skip: options?.skip,
        take: options?.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.application.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: string) {
    return this.prisma.application.findUnique({
      where: { id },
      include: {
        assignee: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async create(data: Prisma.ApplicationCreateInput) {
    return this.prisma.application.create({ data });
  }

  async update(id: string, data: Prisma.ApplicationUpdateInput) {
    return this.prisma.application.update({ where: { id }, data });
  }

  async softDelete(id: string, deletedBy: string) {
    return this.prisma.application.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy },
    });
  }
}
