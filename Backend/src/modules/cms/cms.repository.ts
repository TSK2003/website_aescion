import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CmsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ==================== PAGES ====================

  async findAllPages(
    tenantId: string,
    options?: { status?: string; skip?: number; take?: number },
  ) {
    const where: Prisma.PageWhereInput = {
      tenantId,
      deletedAt: null,
      ...(options?.status && { status: options.status as any }),
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

  async findPageBySlug(slug: string) {
    return this.prisma.page.findUnique({
      where: { slug },
      include: {
        blocks: { orderBy: { order: 'asc' }, where: { isVisible: true } },
      },
    });
  }

  async findPageById(id: string) {
    return this.prisma.page.findUnique({
      where: { id },
      include: {
        blocks: { orderBy: { order: 'asc' } },
        versions: { orderBy: { version: 'desc' }, take: 10 },
      },
    });
  }

  async createPage(data: Prisma.PageCreateInput) {
    return this.prisma.page.create({ data, include: { blocks: true } });
  }

  async updatePage(id: string, data: Prisma.PageUpdateInput) {
    return this.prisma.page.update({
      where: { id },
      data,
      include: { blocks: true },
    });
  }

  async softDeletePage(id: string, deletedBy: string) {
    return this.prisma.page.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy },
    });
  }

  // ==================== PAGE BLOCKS ====================

  async createBlock(data: Prisma.PageBlockCreateInput) {
    return this.prisma.pageBlock.create({ data });
  }

  async updateBlock(id: string, data: Prisma.PageBlockUpdateInput) {
    return this.prisma.pageBlock.update({ where: { id }, data });
  }

  async deleteBlock(id: string) {
    return this.prisma.pageBlock.delete({ where: { id } });
  }

  async reorderBlocks(pageId: string, blockIds: string[]) {
    const updates = blockIds.map((id, index) =>
      this.prisma.pageBlock.update({ where: { id }, data: { order: index } }),
    );
    return this.prisma.$transaction(updates);
  }

  // ==================== PAGE VERSIONS ====================

  async createVersion(data: Prisma.PageVersionCreateInput) {
    return this.prisma.pageVersion.create({ data });
  }

  async findVersions(pageId: string) {
    return this.prisma.pageVersion.findMany({
      where: { pageId },
      orderBy: { version: 'desc' },
    });
  }

  async findVersionByNumber(pageId: string, version: number) {
    return this.prisma.pageVersion.findUnique({
      where: { pageId_version: { pageId, version } },
    });
  }
}
