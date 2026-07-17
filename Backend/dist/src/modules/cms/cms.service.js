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
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const cms_repository_1 = require("./cms.repository");
let CmsService = class CmsService {
    cmsRepo;
    constructor(cmsRepo) {
        this.cmsRepo = cmsRepo;
    }
    async getAllPages(tenantId, page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        const result = await this.cmsRepo.findAllPages(tenantId, { status, skip, take: limit });
        return {
            items: result.data,
            meta: {
                total: result.total,
                page,
                limit,
                totalPages: Math.ceil(result.total / limit),
            },
        };
    }
    async getPageBySlug(slug) {
        const page = await this.cmsRepo.findPageBySlug(slug);
        if (!page)
            throw new common_1.NotFoundException(`Page with slug "${slug}" not found`);
        return page;
    }
    async getPageById(id) {
        const page = await this.cmsRepo.findPageById(id);
        if (!page)
            throw new common_1.NotFoundException(`Page with id "${id}" not found`);
        return page;
    }
    async createPage(tenantId, dto, userId) {
        return this.cmsRepo.createPage({
            tenant: { connect: { id: tenantId } },
            title: dto.title,
            slug: dto.slug,
            description: dto.description,
            status: dto.status,
            metaTitle: dto.metaTitle,
            metaDesc: dto.metaDesc,
            createdBy: userId,
        });
    }
    async updatePage(id, dto, userId) {
        await this.getPageById(id);
        return this.cmsRepo.updatePage(id, {
            ...dto,
            updatedBy: userId,
        });
    }
    async deletePage(id, userId) {
        await this.getPageById(id);
        return this.cmsRepo.softDeletePage(id, userId);
    }
    async createPageVersion(pageId, userId) {
        const page = await this.getPageById(pageId);
        const versions = await this.cmsRepo.findVersions(pageId);
        const nextVersion = versions.length > 0 ? versions[0].version + 1 : 1;
        const snapshot = { ...page, blocks: page.blocks };
        return this.cmsRepo.createVersion({
            page: { connect: { id: pageId } },
            version: nextVersion,
            snapshot,
            changedBy: userId,
        });
    }
    async reorderBlocks(pageId, blockIds) {
        await this.getPageById(pageId);
        return this.cmsRepo.reorderBlocks(pageId, blockIds);
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cms_repository_1.CmsRepository])
], CmsService);
//# sourceMappingURL=cms.service.js.map