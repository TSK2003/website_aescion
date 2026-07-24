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
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let NewsletterService = class NewsletterService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async subscribe(email) {
        const normalizedEmail = email.toLowerCase().trim();
        const existing = await this.prisma.newsletterSubscriber.findUnique({
            where: { email: normalizedEmail },
        });
        if (existing) {
            if (existing.status === 'SUBSCRIBED') {
                throw new common_1.ConflictException('This email is already subscribed to our newsletter.');
            }
            return this.prisma.newsletterSubscriber.update({
                where: { id: existing.id },
                data: { status: 'SUBSCRIBED' },
            });
        }
        return this.prisma.newsletterSubscriber.create({
            data: {
                email: normalizedEmail,
                status: 'SUBSCRIBED',
            },
        });
    }
    async getAllSubscribers() {
        return this.prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map