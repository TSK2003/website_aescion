import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
export declare class SettingsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllSettings(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: Prisma.JsonValue;
        isPublic: boolean;
    }[]>;
    findPublicSettings(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: Prisma.JsonValue;
        isPublic: boolean;
    }[]>;
    getSetting(tenantId: string, group: string, key: string): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: Prisma.JsonValue;
        isPublic: boolean;
    } | null>;
    upsertSetting(tenantId: string, group: string, key: string, data: Prisma.SystemSettingCreateInput, updatedBy: string): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: Prisma.JsonValue;
        isPublic: boolean;
    }>;
}
