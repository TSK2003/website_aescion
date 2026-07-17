import { PrismaService } from '../database/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTrafficStats(tenantId: string): Promise<{
        visitors: number;
        sessions: number;
        pageViews: number;
    }>;
}
