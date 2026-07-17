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
exports.MediaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let MediaRepository = class MediaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllFolders(tenantId, parentId) {
        return this.prisma.mediaFolder.findMany({
            where: { tenantId, parentId: parentId || null, status: 'ACTIVE' },
            orderBy: { name: 'asc' },
        });
    }
    async findFolderById(id) {
        return this.prisma.mediaFolder.findUnique({
            where: { id },
            include: { children: true },
        });
    }
    async createFolder(data) {
        return this.prisma.mediaFolder.create({ data });
    }
    async updateFolder(id, data) {
        return this.prisma.mediaFolder.update({ where: { id }, data });
    }
    async deleteFolder(id) {
        return this.prisma.mediaFolder.update({
            where: { id },
            data: { status: 'DELETED' },
        }).catch(() => this.prisma.mediaFolder.delete({ where: { id } }));
    }
    async findAllFiles(tenantId, options) {
        const where = {
            tenantId,
            deletedAt: null,
            ...(options?.folderId !== undefined && { folderId: options.folderId }),
            ...(options?.mediaType && { mediaType: options.mediaType }),
            ...(options?.search && {
                OR: [
                    { filename: { contains: options.search, mode: 'insensitive' } },
                    { originalName: { contains: options.search, mode: 'insensitive' } },
                    { altText: { contains: options.search, mode: 'insensitive' } },
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
    async findFileById(id) {
        return this.prisma.mediaFile.findUnique({ where: { id } });
    }
    async createFile(data) {
        return this.prisma.mediaFile.create({ data });
    }
    async updateFile(id, data) {
        return this.prisma.mediaFile.update({ where: { id }, data });
    }
    async softDeleteFile(id, deletedBy) {
        return this.prisma.mediaFile.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE', createdBy: deletedBy },
        });
    }
};
exports.MediaRepository = MediaRepository;
exports.MediaRepository = MediaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaRepository);
//# sourceMappingURL=media.repository.js.map