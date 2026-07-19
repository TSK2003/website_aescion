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
exports.ApplicationsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ApplicationsRepository = class ApplicationsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, options) {
        const where = {
            tenantId,
            deletedAt: null,
            ...(options?.type && { type: options.type }),
            ...(options?.status && { status: options.status }),
            ...(options?.assigneeId && { assigneeId: options.assigneeId }),
            ...(options?.search && {
                OR: [
                    {
                        firstName: {
                            contains: options.search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        lastName: {
                            contains: options.search,
                            mode: 'insensitive',
                        },
                    },
                    { email: { contains: options.search, mode: 'insensitive' } },
                    {
                        position: {
                            contains: options.search,
                            mode: 'insensitive',
                        },
                    },
                ],
            }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.application.findMany({
                where,
                include: {
                    assignee: { select: { id: true, firstName: true, lastName: true } },
                },
                skip: options?.skip,
                take: options?.take,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.application.count({ where }),
        ]);
        return { data, total };
    }
    async findById(id) {
        return this.prisma.application.findUnique({
            where: { id },
            include: {
                assignee: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
            },
        });
    }
    async create(data) {
        return this.prisma.application.create({ data });
    }
    async update(id, data) {
        return this.prisma.application.update({ where: { id }, data });
    }
    async softDelete(id, deletedBy) {
        return this.prisma.application.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy },
        });
    }
};
exports.ApplicationsRepository = ApplicationsRepository;
exports.ApplicationsRepository = ApplicationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsRepository);
//# sourceMappingURL=applications.repository.js.map