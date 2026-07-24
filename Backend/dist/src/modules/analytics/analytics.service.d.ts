import { PrismaService } from '../database/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTrafficStats(tenantId: string, startDate?: string, endDate?: string): Promise<{
        visitors: number;
        sessions: number;
        pageViews: number;
        totalLeads: number;
        totalApplications: number;
        publishedBlogs: number;
        activeServices: number;
        startDate: string | null;
        endDate: string | null;
    }>;
}
