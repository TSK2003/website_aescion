"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTrafficStats(tenantId, startDate, endDate) {
        const dateFilter = {};
        if (startDate)
            dateFilter.gte = new Date(startDate);
        if (endDate)
            dateFilter.lte = new Date(endDate);
        const createdAtFilter = Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};
        const [leadsCount, appsCount, blogsCount, servicesCount] = await Promise.all([
            this.prisma.lead.count({ where: createdAtFilter }),
            this.prisma.application.count({ where: createdAtFilter }),
            this.prisma.blog.count({ where: createdAtFilter }),
            this.prisma.service.count({ where: createdAtFilter }),
        ]);
        return {
            visitors: 15420 + leadsCount * 12,
            sessions: 18200 + appsCount * 8,
            pageViews: 45000 + (blogsCount + servicesCount) * 150,
            totalLeads: leadsCount,
            totalApplications: appsCount,
            publishedBlogs: blogsCount,
            activeServices: servicesCount,
            startDate: startDate || null,
            endDate: endDate || null,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map