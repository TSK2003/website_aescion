import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    tenantId: string,
    options?: {
      status?: string;
      categoryId?: string;
      tagId?: string;
      search?: string;
      isFeatured?: boolean;
      skip?: number;
      take?: number;
    },
  ) {
    const where: Prisma.BlogWhereInput = {
      tenantId,
      deletedAt: null,
      ...(options?.status && { status: options.status as any }),
      ...(options?.categoryId && { categoryId: options.categoryId }),
      ...(options?.isFeatured !== undefined && {
        isFeatured: options.isFeatured,
      }),
      ...(options?.tagId && { tags: { some: { tagId: options.tagId } } }),
      ...(options?.search && {
        OR: [
          { title: { contains: options.search, mode: 'insensitive' as const } },
          {
            excerpt: { contains: options.search, mode: 'insensitive' as const },
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

  async findBySlug(slug: string) {
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

  async findById(id: string) {
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

  async create(data: Prisma.BlogCreateInput) {
    return this.prisma.blog.create({ data });
  }

  async update(id: string, data: Prisma.BlogUpdateInput) {
    return this.prisma.blog.update({ where: { id }, data });
  }

  async softDelete(id: string, deletedBy: string) {
    return this.prisma.blog.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy },
    });
  }

  async setTags(blogId: string, tagIds: string[]) {
    await this.prisma.blogTag.deleteMany({ where: { blogId } });
    if (tagIds.length > 0) {
      await this.prisma.blogTag.createMany({
        data: tagIds.map((tagId) => ({ blogId, tagId })),
      });
    }
  }

  // Categories
  async findAllCategories(tenantId: string) {
    return this.prisma.category.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' },
    });
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  // Tags
  async findAllTags(tenantId: string) {
    return this.prisma.tag.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  }

  async createTag(data: Prisma.TagCreateInput) {
    return this.prisma.tag.create({ data });
  }
}
