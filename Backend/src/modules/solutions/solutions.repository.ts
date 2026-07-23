import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SolutionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string) {
    const settings = await this.prisma.systemSetting.findMany({
      where: { tenantId, group: 'solutions' },
    });
    return settings.map((s) => ({
      id: s.id,
      key: s.key,
      ...(s.value as any),
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }));
  }

  async findPublic(tenantId: string) {
    const settings = await this.prisma.systemSetting.findMany({
      where: { tenantId, group: 'solutions', isPublic: true },
    });
    const list = settings
      .map((s) => ({
        id: s.id,
        key: s.key,
        ...(s.value as any),
      }))
      .filter((sol) => sol.status !== 'DRAFT');
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async findBySlug(tenantId: string, slug: string) {
    const setting = await this.prisma.systemSetting.findUnique({
      where: {
        tenantId_group_key: {
          tenantId,
          group: 'solutions',
          key: slug,
        },
      },
    });
    if (!setting) return null;
    return {
      id: setting.id,
      key: setting.key,
      ...(setting.value as any),
    };
  }

  async upsert(tenantId: string, slug: string, value: any, description?: string, userId?: string) {
    return this.prisma.systemSetting.upsert({
      where: {
        tenantId_group_key: {
          tenantId,
          group: 'solutions',
          key: slug,
        },
      },
      create: {
        tenantId,
        group: 'solutions',
        key: slug,
        value,
        description: description || value.title,
        isPublic: true,
        updatedBy: userId,
      },
      update: {
        value,
        description: description || value.title,
        isPublic: true,
        updatedBy: userId,
      },
    });
  }

  async delete(tenantId: string, slug: string) {
    return this.prisma.systemSetting.delete({
      where: {
        tenantId_group_key: {
          tenantId,
          group: 'solutions',
          key: slug,
        },
      },
    });
  }
}
