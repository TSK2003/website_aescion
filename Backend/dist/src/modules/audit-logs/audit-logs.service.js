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
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let AuditLogsService = class AuditLogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logAction(data) {
        try {
            return await this.prisma.auditLog.create({
                data: {
                    tenantId: data.tenantId,
                    userId: data.userId,
                    module: data.module,
                    action: data.action,
                    entityId: data.entityId,
                    entityType: data.entityType,
                    oldValue: data.oldValue ? JSON.parse(JSON.stringify(data.oldValue)) : undefined,
                    newValue: data.newValue ? JSON.parse(JSON.stringify(data.newValue)) : undefined,
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                    metadata: data.metadata ? JSON.parse(JSON.stringify(data.metadata)) : undefined,
                },
            });
        }
        catch (err) {
            console.warn('[AuditLog] Failed to log action:', err);
        }
    }
    async getAllLogs(tenantId, options) {
        const page = options?.page || 1;
        const limit = options?.limit || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (tenantId)
            where.tenantId = tenantId;
        if (options?.module)
            where.module = options.module;
        if (options?.search) {
            where.OR = [
                { action: { contains: options.search, mode: 'insensitive' } },
                { module: { contains: options.search, mode: 'insensitive' } },
                { entityType: { contains: options.search, mode: 'insensitive' } },
            ];
        }
        const [items, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return {
            items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditLogsService);
//# sourceMappingURL=audit-logs.service.js.map