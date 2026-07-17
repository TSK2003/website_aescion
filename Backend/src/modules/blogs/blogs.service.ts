import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';

@Injectable()
export class BlogsService {
  constructor(private readonly blogsRepo: BlogsRepository) {}

  async getAll(tenantId: string, options: {
    page?: number;
    limit?: number;
    status?: string;
    categoryId?: string;
    tagId?: string;
    search?: string;
    isFeatured?: boolean;
  }) {
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

  async getBySlug(slug: string) {
    const blog = await this.blogsRepo.findBySlug(slug);
    if (!blog) throw new NotFoundException(`Blog "${slug}" not found`);
    return blog;
  }

  async getById(id: string) {
    const blog = await this.blogsRepo.findById(id);
    if (!blog) throw new NotFoundException(`Blog "${id}" not found`);
    return blog;
  }

  async create(tenantId: string, dto: any, userId: string) {
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

  async update(id: string, dto: any, userId: string) {
    await this.getById(id);
    const { tagIds, ...blogData } = dto;

    await this.blogsRepo.update(id, { ...blogData, updatedBy: userId } as any);

    if (tagIds !== undefined) {
      await this.blogsRepo.setTags(id, tagIds);
    }

    return this.getById(id);
  }

  async delete(id: string, userId: string) {
    await this.getById(id);
    return this.blogsRepo.softDelete(id, userId);
  }

  async getCategories(tenantId: string) {
    return this.blogsRepo.findAllCategories(tenantId);
  }

  async createCategory(tenantId: string, name: string, slug: string) {
    return this.blogsRepo.createCategory({
      tenant: { connect: { id: tenantId } },
      name,
      slug,
    });
  }

  async getTags(tenantId: string) {
    return this.blogsRepo.findAllTags(tenantId);
  }

  async createTag(tenantId: string, name: string, slug: string) {
    return this.blogsRepo.createTag({
      tenant: { connect: { id: tenantId } },
      name,
      slug,
    });
  }
}
