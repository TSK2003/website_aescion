import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string, options?: { status?: string; skip?: number; take?: number }) {
    const where: Prisma.ServiceWhereInput = {
      tenantId,
      deletedAt: null,
      ...(options?.status && { status: options.status as any }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.service.findMany({
        where,
        skip: options?.skip,
        take: options?.take,
        orderBy: { order: 'asc' },
      }),
      this.prisma.service.count({ where }),
    ]);

    return { data, total };
  }

  async findPublicServices(tenantId?: string) {
    const where: Prisma.ServiceWhereInput = {
      status: 'PUBLISHED',
      deletedAt: null,
      ...(tenantId && { tenantId }),
    };
    return this.prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.service.findUnique({
      where: { slug },
    });
  }

  async findById(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ServiceCreateInput) {
    return this.prisma.service.create({ data });
  }

  async update(id: string, data: Prisma.ServiceUpdateInput) {
    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, deletedBy?: string) {
    return this.prisma.service.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy },
    });
  }
}
