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
exports.SolutionsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let SolutionsRepository = class SolutionsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        const settings = await this.prisma.systemSetting.findMany({
            where: { tenantId, group: 'solutions' },
        });
        return settings.map((s) => ({
            id: s.id,
            key: s.key,
            ...s.value,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
        }));
    }
    async findPublic(tenantId) {
        const settings = await this.prisma.systemSetting.findMany({
            where: { tenantId, group: 'solutions', isPublic: true },
        });
        const list = settings
            .map((s) => ({
            id: s.id,
            key: s.key,
            ...s.value,
        }))
            .filter((sol) => sol.status !== 'DRAFT');
        return list.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    async findBySlug(tenantId, slug) {
        const setting = await this.prisma.systemSetting.findUnique({
            where: {
                tenantId_group_key: {
                    tenantId,
                    group: 'solutions',
                    key: slug,
                },
            },
        });
        if (!setting)
            return null;
        return {
            id: setting.id,
            key: setting.key,
            ...setting.value,
        };
    }
    async upsert(tenantId, slug, value, description, userId) {
        return this.prisma.systemSetting.upsert({
            where: {
                tenantId_group_key: {
                    tenantId,
                    group: 'solutions',
                    key: slug,
                },
            },
            create: {
                tenantId,
                group: 'solutions',
                key: slug,
                value,
                description: description || value.title,
                isPublic: true,
                updatedBy: userId,
            },
            update: {
                value,
                description: description || value.title,
                isPublic: true,
                updatedBy: userId,
            },
        });
    }
    async delete(tenantId, slug) {
        return this.prisma.systemSetting.delete({
            where: {
                tenantId_group_key: {
                    tenantId,
                    group: 'solutions',
                    key: slug,
                },
            },
        });
    }
};
exports.SolutionsRepository = SolutionsRepository;
exports.SolutionsRepository = SolutionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SolutionsRepository);
//# sourceMappingURL=solutions.repository.js.map