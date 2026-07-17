import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepo: MediaRepository) {}

  async getFolders(tenantId: string, parentId?: string) {
    return this.mediaRepo.findAllFolders(tenantId, parentId);
  }

  async createFolder(tenantId: string, name: string, parentId?: string, userId?: string) {
    // Generate path based on parent
    let path = `/${name}`;
    if (parentId) {
      const parent = await this.mediaRepo.findFolderById(parentId);
      if (parent) {
        path = `${parent.path}/${name}`;
      }
    }

    return this.mediaRepo.createFolder({
      tenant: { connect: { id: tenantId } },
      name,
      path,
      ...(parentId && { parent: { connect: { id: parentId } } }),
      createdBy: userId,
    });
  }

  async getFiles(tenantId: string, options: { page?: number; limit?: number; folderId?: string; mediaType?: string; search?: string }) {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    const result = await this.mediaRepo.findAllFiles(tenantId, { ...options, skip, take: limit });
    
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

  async getFileById(id: string) {
    const file = await this.mediaRepo.findFileById(id);
    if (!file) throw new NotFoundException(`File "${id}" not found`);
    return file;
  }

  // File upload logic would integrate with AWS S3 or Local File System here
  async registerFile(tenantId: string, fileData: any, userId: string) {
    return this.mediaRepo.createFile({
      tenant: { connect: { id: tenantId } },
      ...(fileData.folderId && { folder: { connect: { id: fileData.folderId } } }),
      filename: fileData.filename,
      originalName: fileData.originalName,
      mimeType: fileData.mimeType,
      size: fileData.size,
      url: fileData.url,
      thumbnailUrl: fileData.thumbnailUrl,
      altText: fileData.altText,
      caption: fileData.caption,
      width: fileData.width,
      height: fileData.height,
      mediaType: fileData.mediaType || 'OTHER',
      createdBy: userId,
    });
  }

  async updateFile(id: string, updateData: any) {
    await this.getFileById(id);
    return this.mediaRepo.updateFile(id, updateData);
  }

  async deleteFile(id: string, userId: string) {
    await this.getFileById(id);
    return this.mediaRepo.softDeleteFile(id, userId);
  }
}
