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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const services_repository_1 = require("./services.repository");
let ServicesService = class ServicesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getPublicServices(tenantId) {
        return this.repo.findPublicServices(tenantId);
    }
    async getPublicServiceBySlug(slug) {
        const service = await this.repo.findBySlug(slug);
        if (!service || service.deletedAt || service.status !== 'PUBLISHED') {
            throw new common_1.NotFoundException(`Service with slug ${slug} not found`);
        }
        return service;
    }
    async getAllServices(tenantId, page = 1, limit = 50, status) {
        const skip = (page - 1) * limit;
        return this.repo.findAll(tenantId, { status, skip, take: limit });
    }
    async getServiceById(id) {
        const service = await this.repo.findById(id);
        if (!service || service.deletedAt) {
            throw new common_1.NotFoundException(`Service ${id} not found`);
        }
        return service;
    }
    async createService(tenantId, dto, userId) {
        return this.repo.create({
            tenant: { connect: { id: tenantId } },
            title: dto.title,
            slug: dto.slug,
            shortDescription: dto.shortDescription,
            content: dto.content,
            icon: dto.icon || 'Code',
            features: dto.features || [],
            order: dto.order ?? 0,
            status: dto.status || 'PUBLISHED',
            metaTitle: dto.metaTitle,
            metaDesc: dto.metaDesc,
            createdBy: userId,
        });
    }
    async updateService(id, dto, userId) {
        await this.getServiceById(id);
        return this.repo.update(id, {
            ...dto,
            status: dto.status,
            updatedBy: userId,
        });
    }
    async deleteService(id, userId) {
        await this.getServiceById(id);
        return this.repo.delete(id, userId);
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_repository_1.ServicesRepository])
], ServicesService);
//# sourceMappingURL=services.service.js.map