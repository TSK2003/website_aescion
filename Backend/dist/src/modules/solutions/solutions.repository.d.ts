import { PrismaService } from '../database/prisma.service';
export declare class SolutionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string): Promise<any[]>;
    findPublic(tenantId: string): Promise<any[]>;
    findBySlug(tenantId: string, slug: string): Promise<any>;
    upsert(tenantId: string, slug: string, value: any, description?: string, userId?: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        description: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
    delete(tenantId: string, slug: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        description: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
}
