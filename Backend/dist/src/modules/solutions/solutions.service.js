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
exports.SolutionsService = void 0;
const common_1 = require("@nestjs/common");
const solutions_repository_1 = require("./solutions.repository");
const DEFAULT_TENANT_ID = process.env.DEFAULT_TENANT_ID || '00000000-0000-0000-0000-000000000001';
let SolutionsService = class SolutionsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getPublicSolutions(tenantId) {
        const tid = tenantId || DEFAULT_TENANT_ID;
        return this.repo.findPublic(tid);
    }
    async getPublicSolutionBySlug(slug, tenantId) {
        const tid = tenantId || DEFAULT_TENANT_ID;
        const sol = await this.repo.findBySlug(tid, slug);
        if (!sol) {
            throw new common_1.NotFoundException(`Solution with slug ${slug} not found`);
        }
        return sol;
    }
    async getAllSolutions(tenantId) {
        return this.repo.findAll(tenantId);
    }
    async createSolution(tenantId, dto, userId) {
        const value = {
            title: dto.title,
            slug: dto.slug,
            shortDescription: dto.shortDescription,
            content: dto.content,
            category: dto.category || 'Enterprise',
            icon: dto.icon || 'Cpu',
            benefits: dto.benefits || [],
            techStack: dto.techStack || [],
            order: dto.order ?? 0,
            status: dto.status || 'PUBLISHED',
        };
        return this.repo.upsert(tenantId, dto.slug, value, dto.title, userId);
    }
    async updateSolution(tenantId, slug, dto, userId) {
        const existing = await this.repo.findBySlug(tenantId, slug);
        if (!existing) {
            throw new common_1.NotFoundException(`Solution with slug ${slug} not found`);
        }
        const updatedValue = {
            ...existing,
            ...dto,
        };
        const newSlug = dto.slug || slug;
        if (newSlug !== slug) {
            await this.repo.delete(tenantId, slug);
        }
        return this.repo.upsert(tenantId, newSlug, updatedValue, updatedValue.title, userId);
    }
    async deleteSolution(tenantId, slug) {
        return this.repo.delete(tenantId, slug);
    }
};
exports.SolutionsService = SolutionsService;
exports.SolutionsService = SolutionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [solutions_repository_1.SolutionsRepository])
], SolutionsService);
//# sourceMappingURL=solutions.service.js.map