import { Injectable, NotFoundException } from '@nestjs/common';
import { SettingsRepository } from './settings.repository';

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepo: SettingsRepository) {}

  async getAllSettings(tenantId: string) {
    return this.settingsRepo.findAllSettings(tenantId);
  }

  async getPublicSettings(tenantId: string) {
    return this.settingsRepo.findPublicSettings(tenantId);
  }

  async getSetting(tenantId: string, group: string, key: string) {
    const setting = await this.settingsRepo.getSetting(tenantId, group, key);
    if (!setting)
      throw new NotFoundException(`Setting ${group}.${key} not found`);
    return setting;
  }

  async updateSetting(
    tenantId: string,
    group: string,
    key: string,
    value: any,
    isPublic: boolean,
    description: string,
    userId: string,
  ) {
    return this.settingsRepo.upsertSetting(
      tenantId,
      group,
      key,
      {
        tenant: { connect: { id: tenantId } },
        group,
        key,
        value,
        isPublic,
        description,
      } as any,
      userId,
    );
  }

  async updateBulkSettings(tenantId: string, settings: any[], userId: string) {
    const results = [];
    for (const setting of settings) {
      const res = await this.settingsRepo.upsertSetting(
        tenantId,
        setting.group,
        setting.key,
        {
          tenant: { connect: { id: tenantId } },
          group: setting.group,
          key: setting.key,
          value: setting.value,
          isPublic: setting.isPublic ?? false,
          description: setting.description,
        } as any,
        userId,
      );
      results.push(res);
    }
    return results;
  }
}
