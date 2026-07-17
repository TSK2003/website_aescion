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
exports.SettingsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let SettingsRepository = class SettingsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllSettings(tenantId) {
        return this.prisma.systemSetting.findMany({
            where: { tenantId },
            orderBy: [{ group: 'asc' }, { key: 'asc' }],
        });
    }
    async findPublicSettings(tenantId) {
        return this.prisma.systemSetting.findMany({
            where: { tenantId, isPublic: true },
            orderBy: [{ group: 'asc' }, { key: 'asc' }],
        });
    }
    async getSetting(tenantId, group, key) {
        return this.prisma.systemSetting.findUnique({
            where: { tenantId_group_key: { tenantId, group, key } },
        });
    }
    async upsertSetting(tenantId, group, key, data, updatedBy) {
        return this.prisma.systemSetting.upsert({
            where: { tenantId_group_key: { tenantId, group, key } },
            create: { ...data, updatedBy },
            update: { value: data.value, isPublic: data.isPublic, description: data.description, updatedBy },
        });
    }
};
exports.SettingsRepository = SettingsRepository;
exports.SettingsRepository = SettingsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsRepository);
//# sourceMappingURL=settings.repository.js.map