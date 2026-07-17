import { SettingsRepository } from './settings.repository';
export declare class SettingsService {
    private readonly settingsRepo;
    constructor(settingsRepo: SettingsRepository);
    getAllSettings(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }[]>;
    getPublicSettings(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
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
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
    updateSetting(tenantId: string, group: string, key: string, value: any, isPublic: boolean, description: string, userId: string): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
    updateBulkSettings(tenantId: string, settings: any[], userId: string): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }[]>;
}
