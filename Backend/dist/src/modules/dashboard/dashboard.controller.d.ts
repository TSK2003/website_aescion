import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(user: any): Promise<{
        totalLeads: number;
        pendingApps: number;
        publishedBlogs: number;
        systemHealth: string;
    }>;
    getRecentActivities(user: any): Promise<{
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
