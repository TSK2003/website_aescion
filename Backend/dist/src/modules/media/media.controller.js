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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const media_service_1 = require("./media.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async getFolders(user, parentId) {
        return this.mediaService.getFolders(user.tenantId, parentId);
    }
    async createFolder(user, body) {
        return this.mediaService.createFolder(user.tenantId, body.name, body.parentId, user.id);
    }
    async getFiles(user, page, limit, folderId, mediaType, search) {
        return this.mediaService.getFiles(user.tenantId, { page, limit, folderId, mediaType, search });
    }
    async registerFile(user, body) {
        return this.mediaService.registerFile(user.tenantId, body, user.id);
    }
    async updateFile(id, body) {
        return this.mediaService.updateFile(id, body);
    }
    async deleteFile(id, user) {
        return this.mediaService.deleteFile(id, user.id);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Get)('folders'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'EDITOR'),
    (0, swagger_1.ApiOperation)({ summary: 'List media folders' }),
    (0, swagger_1.ApiQuery)({ name: 'parentId', required: false }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getFolders", null);
__decorate([
    (0, common_1.Post)('folders'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'EDITOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new folder' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Get)('files'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'EDITOR'),
    (0, swagger_1.ApiOperation)({ summary: 'List media files with filters' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'folderId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'mediaType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('folderId')),
    __param(4, (0, common_1.Query)('mediaType')),
    __param(5, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getFiles", null);
__decorate([
    (0, common_1.Post)('files/register'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'EDITOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Register an uploaded file in the database' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "registerFile", null);
__decorate([
    (0, common_1.Put)('files/:id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'EDITOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Update file metadata (alt text, caption)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "updateFile", null);
__decorate([
    (0, common_1.Delete)('files/:id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a media file' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "deleteFile", null);
exports.MediaController = MediaController = __decorate([
    (0, swagger_1.ApiTags)('Media Library'),
    (0, common_1.Controller)('media'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map