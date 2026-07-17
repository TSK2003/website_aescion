import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getTraffic(user: any): Promise<{
        visitors: number;
        sessions: number;
        pageViews: number;
    }>;
}
