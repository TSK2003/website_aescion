import { PrismaService } from '../database/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(tenantId: string): Promise<{
        totalLeads: number;
        pendingApps: number;
        publishedBlogs: number;
        systemHealth: string;
    }>;
    getRecentActivities(tenantId: string): Promise<{
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
    }[]>;
}
