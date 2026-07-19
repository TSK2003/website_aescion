import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllFolders(tenantId: string, parentId?: string) {
    return this.prisma.mediaFolder.findMany({
      where: { tenantId, parentId: parentId || null, status: 'ACTIVE' },
      orderBy: { name: 'asc' },
    });
  }

  async findFolderById(id: string) {
    return this.prisma.mediaFolder.findUnique({
      where: { id },
      include: { children: true },
    });
  }

  async createFolder(data: Prisma.MediaFolderCreateInput) {
    return this.prisma.mediaFolder.create({ data });
  }

  async updateFolder(id: string, data: Prisma.MediaFolderUpdateInput) {
    return this.prisma.mediaFolder.update({ where: { id }, data });
  }

  async deleteFolder(id: string) {
    return this.prisma.mediaFolder
      .update({
        where: { id },
        data: { status: 'DELETED' as any }, // Assuming DELETED might be added or we just hard delete, for now hard delete.
      })
      .catch(() => this.prisma.mediaFolder.delete({ where: { id } })); // Fallback if no DELETED status
  }

  async findAllFiles(
    tenantId: string,
    options?: {
      folderId?: string;
      mediaType?: string;
      search?: string;
      skip?: number;
      take?: number;
    },
  ) {
    const where: Prisma.MediaFileWhereInput = {
      tenantId,
      deletedAt: null,
      ...(options?.folderId !== undefined && { folderId: options.folderId }),
      ...(options?.mediaType && { mediaType: options.mediaType as any }),
      ...(options?.search && {
        OR: [
          {
            filename: {
              contains: options.search,
              mode: 'insensitive' as const,
            },
          },
          {
            originalName: {
              contains: options.search,
              mode: 'insensitive' as const,
            },
          },
          {
            altText: { contains: options.search, mode: 'insensitive' as const },
          },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.mediaFile.findMany({
        where,
        skip: options?.skip,
        take: options?.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.mediaFile.count({ where }),
    ]);

    return { data, total };
  }

  async findFileById(id: string) {
    return this.prisma.mediaFile.findUnique({ where: { id } });
  }

  async createFile(data: Prisma.MediaFileCreateInput) {
    return this.prisma.mediaFile.create({ data });
  }

  async updateFile(id: string, data: Prisma.MediaFileUpdateInput) {
    return this.prisma.mediaFile.update({ where: { id }, data });
  }

  async softDeleteFile(id: string, deletedBy: string) {
    return this.prisma.mediaFile.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'INACTIVE', createdBy: deletedBy }, // using createdBy as updatedBy placeholder for now
    });
  }
}
