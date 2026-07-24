import { PrismaService } from '../database/prisma.service';
export declare class AuditLogsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logAction(data: {
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
    }): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string | null;
        module: string;
        action: string;
        entityId: string | null;
        entityType: string | null;
        oldValue: import("@prisma/client/runtime/client").JsonValue | null;
        newValue: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
    } | undefined>;
    getAllLogs(tenantId?: string, options?: {
        page?: number;
        limit?: number;
        module?: string;
        search?: string;
    }): Promise<{
        items: ({
            user: {
                email: string;
                firstName: string;
                lastName: string;
            } | null;
        } & {
            id: string;
            tenantId: string | null;
            createdAt: Date;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            userId: string | null;
            module: string;
            action: string;
            entityId: string | null;
            entityType: string | null;
            oldValue: import("@prisma/client/runtime/client").JsonValue | null;
            newValue: import("@prisma/client/runtime/client").JsonValue | null;
            ipAddress: string | null;
            userAgent: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
