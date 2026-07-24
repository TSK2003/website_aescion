import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getTraffic(user: any, startDate?: string, endDate?: string): Promise<{
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
