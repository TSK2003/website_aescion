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
exports.CmsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let CmsRepository = class CmsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllPages(tenantId, options) {
        const where = {
            tenantId,
            deletedAt: null,
            ...(options?.status && { status: options.status }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.page.findMany({
                where,
                include: { blocks: { orderBy: { order: 'asc' } } },
                skip: options?.skip,
                take: options?.take,
                orderBy: { updatedAt: 'desc' },
            }),
            this.prisma.page.count({ where }),
        ]);
        return { data, total };
    }
    async findPageBySlug(slug) {
        return this.prisma.page.findUnique({
            where: { slug },
            include: {
                blocks: { orderBy: { order: 'asc' }, where: { isVisible: true } },
            },
        });
    }
    async findPageById(id) {
        return this.prisma.page.findUnique({
            where: { id },
            include: {
                blocks: { orderBy: { order: 'asc' } },
                versions: { orderBy: { version: 'desc' }, take: 10 },
            },
        });
    }
    async createPage(data) {
        return this.prisma.page.create({ data, include: { blocks: true } });
    }
    async updatePage(id, data) {
        return this.prisma.page.update({ where: { id }, data, include: { blocks: true } });
    }
    async softDeletePage(id, deletedBy) {
        return this.prisma.page.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy },
        });
    }
    async createBlock(data) {
        return this.prisma.pageBlock.create({ data });
    }
    async updateBlock(id, data) {
        return this.prisma.pageBlock.update({ where: { id }, data });
    }
    async deleteBlock(id) {
        return this.prisma.pageBlock.delete({ where: { id } });
    }
    async reorderBlocks(pageId, blockIds) {
        const updates = blockIds.map((id, index) => this.prisma.pageBlock.update({ where: { id }, data: { order: index } }));
        return this.prisma.$transaction(updates);
    }
    async createVersion(data) {
        return this.prisma.pageVersion.create({ data });
    }
    async findVersions(pageId) {
        return this.prisma.pageVersion.findMany({
            where: { pageId },
            orderBy: { version: 'desc' },
        });
    }
    async findVersionByNumber(pageId, version) {
        return this.prisma.pageVersion.findUnique({
            where: { pageId_version: { pageId, version } },
        });
    }
};
exports.CmsRepository = CmsRepository;
exports.CmsRepository = CmsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CmsRepository);
//# sourceMappingURL=cms.repository.js.map