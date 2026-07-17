import { Injectable, NotFoundException } from '@nestjs/common';
import { CmsRepository } from './cms.repository';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class CmsService {
  constructor(private readonly cmsRepo: CmsRepository) {}

  async getAllPages(tenantId: string, page = 1, limit = 10, status?: string) {
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

  async getPageBySlug(slug: string) {
    const page = await this.cmsRepo.findPageBySlug(slug);
    if (!page) throw new NotFoundException(`Page with slug "${slug}" not found`);
    return page;
  }

  async getPageById(id: string) {
    const page = await this.cmsRepo.findPageById(id);
    if (!page) throw new NotFoundException(`Page with id "${id}" not found`);
    return page;
  }

  async createPage(tenantId: string, dto: CreatePageDto, userId: string) {
    return this.cmsRepo.createPage({
      tenant: { connect: { id: tenantId } },
      title: dto.title,
      slug: dto.slug,
      description: dto.description,
      status: dto.status as any,
      metaTitle: dto.metaTitle,
      metaDesc: dto.metaDesc,
      createdBy: userId,
    });
  }

  async updatePage(id: string, dto: UpdatePageDto, userId: string) {
    await this.getPageById(id); // Ensure exists
    return this.cmsRepo.updatePage(id, {
      ...dto,
      updatedBy: userId,
    } as any);
  }

  async deletePage(id: string, userId: string) {
    await this.getPageById(id);
    return this.cmsRepo.softDeletePage(id, userId);
  }

  async createPageVersion(pageId: string, userId: string) {
    const page = await this.getPageById(pageId);
    // Find max version number
    const versions = await this.cmsRepo.findVersions(pageId);
    const nextVersion = versions.length > 0 ? versions[0].version + 1 : 1;

    const snapshot = { ...page, blocks: (page as any).blocks };

    return this.cmsRepo.createVersion({
      page: { connect: { id: pageId } },
      version: nextVersion,
      snapshot,
      changedBy: userId,
    });
  }

  async reorderBlocks(pageId: string, blockIds: string[]) {
    await this.getPageById(pageId);
    return this.cmsRepo.reorderBlocks(pageId, blockIds);
  }
}
