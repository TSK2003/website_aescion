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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const blogs_repository_1 = require("./blogs.repository");
let BlogsService = class BlogsService {
    blogsRepo;
    constructor(blogsRepo) {
        this.blogsRepo = blogsRepo;
    }
    async getAll(tenantId, options) {
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;
        const result = await this.blogsRepo.findAll(tenantId, { ...options, skip, take: limit });
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
    async getBySlug(slug) {
        const blog = await this.blogsRepo.findBySlug(slug);
        if (!blog)
            throw new common_1.NotFoundException(`Blog "${slug}" not found`);
        return blog;
    }
    async getById(id) {
        const blog = await this.blogsRepo.findById(id);
        if (!blog)
            throw new common_1.NotFoundException(`Blog "${id}" not found`);
        return blog;
    }
    async create(tenantId, dto, userId) {
        const { tagIds, ...blogData } = dto;
        const blog = await this.blogsRepo.create({
            tenant: { connect: { id: tenantId } },
            author: { connect: { id: userId } },
            ...(blogData.categoryId && { category: { connect: { id: blogData.categoryId } } }),
            title: blogData.title,
            slug: blogData.slug,
            content: blogData.content,
            excerpt: blogData.excerpt,
            readTime: blogData.readTime,
            isFeatured: blogData.isFeatured,
            status: blogData.status || 'DRAFT',
            coverImage: blogData.coverImage,
            metaTitle: blogData.metaTitle,
            metaDesc: blogData.metaDesc,
            createdBy: userId,
        });
        if (tagIds?.length) {
            await this.blogsRepo.setTags(blog.id, tagIds);
        }
        return this.getById(blog.id);
    }
    async update(id, dto, userId) {
        await this.getById(id);
        const { tagIds, ...blogData } = dto;
        await this.blogsRepo.update(id, { ...blogData, updatedBy: userId });
        if (tagIds !== undefined) {
            await this.blogsRepo.setTags(id, tagIds);
        }
        return this.getById(id);
    }
    async delete(id, userId) {
        await this.getById(id);
        return this.blogsRepo.softDelete(id, userId);
    }
    async getCategories(tenantId) {
        return this.blogsRepo.findAllCategories(tenantId);
    }
    async createCategory(tenantId, name, slug) {
        return this.blogsRepo.createCategory({
            tenant: { connect: { id: tenantId } },
            name,
            slug,
        });
    }
    async getTags(tenantId) {
        return this.blogsRepo.findAllTags(tenantId);
    }
    async createTag(tenantId, name, slug) {
        return this.blogsRepo.createTag({
            tenant: { connect: { id: tenantId } },
            name,
            slug,
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map