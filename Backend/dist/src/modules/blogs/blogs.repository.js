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
exports.BlogsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let BlogsRepository = class BlogsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, options) {
        const where = {
            tenantId,
            deletedAt: null,
            ...(options?.status && { status: options.status }),
            ...(options?.categoryId && { categoryId: options.categoryId }),
            ...(options?.isFeatured !== undefined && {
                isFeatured: options.isFeatured,
            }),
            ...(options?.tagId && { tags: { some: { tagId: options.tagId } } }),
            ...(options?.search && {
                OR: [
                    { title: { contains: options.search, mode: 'insensitive' } },
                    {
                        excerpt: { contains: options.search, mode: 'insensitive' },
                    },
                ],
            }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.blog.findMany({
                where,
                include: {
                    author: {
                        select: { id: true, firstName: true, lastName: true, avatar: true },
                    },
                    category: { select: { id: true, name: true, slug: true } },
                    tags: {
                        include: { tag: { select: { id: true, name: true, slug: true } } },
                    },
                },
                skip: options?.skip,
                take: options?.take,
                orderBy: { publishedAt: 'desc' },
            }),
            this.prisma.blog.count({ where }),
        ]);
        return { data, total };
    }
    async findBySlug(slug) {
        return this.prisma.blog.findUnique({
            where: { slug },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        bio: true,
                    },
                },
                category: true,
                tags: { include: { tag: true } },
            },
        });
    }
    async findById(id) {
        return this.prisma.blog.findUnique({
            where: { id },
            include: {
                author: {
                    select: { id: true, firstName: true, lastName: true, avatar: true },
                },
                category: true,
                tags: { include: { tag: true } },
            },
        });
    }
    async create(data) {
        return this.prisma.blog.create({ data });
    }
    async update(id, data) {
        return this.prisma.blog.update({ where: { id }, data });
    }
    async softDelete(id, deletedBy) {
        return this.prisma.blog.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy },
        });
    }
    async setTags(blogId, tagIds) {
        await this.prisma.blogTag.deleteMany({ where: { blogId } });
        if (tagIds.length > 0) {
            await this.prisma.blogTag.createMany({
                data: tagIds.map((tagId) => ({ blogId, tagId })),
            });
        }
    }
    async findAllCategories(tenantId) {
        return this.prisma.category.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
    }
    async createCategory(data) {
        return this.prisma.category.create({ data });
    }
    async findAllTags(tenantId) {
        return this.prisma.tag.findMany({
            where: { tenantId },
            orderBy: { name: 'asc' },
        });
    }
    async createTag(data) {
        return this.prisma.tag.create({ data });
    }
};
exports.BlogsRepository = BlogsRepository;
exports.BlogsRepository = BlogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogsRepository);
//# sourceMappingURL=blogs.repository.js.map