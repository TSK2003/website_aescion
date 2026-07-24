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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./modules/database/prisma.service");
let AppService = class AppService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getHello() {
        return 'AESCION Enterprise API Engine Active';
    }
    async search(query) {
        if (!query || query.trim().length === 0)
            return [];
        const term = query.trim();
        const [blogs, services, pages] = await Promise.all([
            this.prisma.blog.findMany({
                where: {
                    OR: [
                        { title: { contains: term, mode: 'insensitive' } },
                        { excerpt: { contains: term, mode: 'insensitive' } },
                    ],
                },
                take: 5,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                },
            }),
            this.prisma.service.findMany({
                where: {
                    OR: [
                        { title: { contains: term, mode: 'insensitive' } },
                        { shortDescription: { contains: term, mode: 'insensitive' } },
                    ],
                },
                take: 5,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    shortDescription: true,
                },
            }),
            this.prisma.page.findMany({
                where: {
                    OR: [
                        { title: { contains: term, mode: 'insensitive' } },
                        { slug: { contains: term, mode: 'insensitive' } },
                    ],
                },
                take: 5,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                },
            }),
        ]);
        const results = [
            ...blogs.map((b) => ({
                id: b.id,
                title: b.title,
                href: `/blog/${b.slug}`,
                category: 'Blog',
                description: b.excerpt,
            })),
            ...services.map((s) => ({
                id: s.id,
                title: s.title,
                href: `/services/${s.slug}`,
                category: 'Service',
                description: s.shortDescription,
            })),
            ...pages.map((p) => ({
                id: p.id,
                title: p.title,
                href: p.slug.startsWith('/') ? p.slug : `/${p.slug}`,
                category: 'Page',
                description: `Website page`,
            })),
        ];
        return results;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map