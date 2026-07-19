import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSettings(tenantId: string) {
    return this.prisma.systemSetting.findMany({
      where: { tenantId },
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });
  }

  async findPublicSettings(tenantId: string) {
    return this.prisma.systemSetting.findMany({
      where: { tenantId, isPublic: true },
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });
  }

  async getSetting(tenantId: string, group: string, key: string) {
    return this.prisma.systemSetting.findUnique({
      where: { tenantId_group_key: { tenantId, group, key } },
    });
  }

  async upsertSetting(
    tenantId: string,
    group: string,
    key: string,
    data: Prisma.SystemSettingCreateInput,
    updatedBy: string,
  ) {
    return this.prisma.systemSetting.upsert({
      where: { tenantId_group_key: { tenantId, group, key } },
      create: { ...data, updatedBy },
      update: {
        value: data.value,
        isPublic: data.isPublic,
        description: data.description,
        updatedBy,
      },
    });
  }
}
