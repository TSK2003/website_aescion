import { AuditLogsService } from './audit-logs.service';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    getAuditLogs(user: any, page?: number, limit?: number, moduleName?: string, search?: string): Promise<{
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
