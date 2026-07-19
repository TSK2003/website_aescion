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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const media_repository_1 = require("./media.repository");
let MediaService = class MediaService {
    mediaRepo;
    constructor(mediaRepo) {
        this.mediaRepo = mediaRepo;
    }
    async getFolders(tenantId, parentId) {
        return this.mediaRepo.findAllFolders(tenantId, parentId);
    }
    async createFolder(tenantId, name, parentId, userId) {
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
    async getFiles(tenantId, options) {
        const page = options.page || 1;
        const limit = options.limit || 20;
        const skip = (page - 1) * limit;
        const result = await this.mediaRepo.findAllFiles(tenantId, {
            ...options,
            skip,
            take: limit,
        });
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
    async getFileById(id) {
        const file = await this.mediaRepo.findFileById(id);
        if (!file)
            throw new common_1.NotFoundException(`File "${id}" not found`);
        return file;
    }
    async registerFile(tenantId, fileData, userId) {
        return this.mediaRepo.createFile({
            tenant: { connect: { id: tenantId } },
            ...(fileData.folderId && {
                folder: { connect: { id: fileData.folderId } },
            }),
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
    async updateFile(id, updateData) {
        await this.getFileById(id);
        return this.mediaRepo.updateFile(id, updateData);
    }
    async deleteFile(id, userId) {
        await this.getFileById(id);
        return this.mediaRepo.softDeleteFile(id, userId);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [media_repository_1.MediaRepository])
], MediaService);
//# sourceMappingURL=media.service.js.map