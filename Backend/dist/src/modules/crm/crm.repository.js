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
exports.CrmRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let CrmRepository = class CrmRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllLeads(tenantId, options) {
        const where = {
            tenantId,
            deletedAt: null,
            ...(options?.stage && { stage: options.stage }),
            ...(options?.source && { source: options.source }),
            ...(options?.priority && { priority: options.priority }),
            ...(options?.ownerId && { ownerId: options.ownerId }),
            ...(options?.search && {
                OR: [
                    { firstName: { contains: options.search, mode: 'insensitive' } },
                    { lastName: { contains: options.search, mode: 'insensitive' } },
                    { email: { contains: options.search, mode: 'insensitive' } },
                    { company: { contains: options.search, mode: 'insensitive' } },
                ],
            }),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.lead.findMany({
                where,
                include: { owner: { select: { id: true, firstName: true, lastName: true, email: true } } },
                skip: options?.skip,
                take: options?.take,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.lead.count({ where }),
        ]);
        return { data, total };
    }
    async findLeadById(id) {
        return this.prisma.lead.findUnique({
            where: { id },
            include: {
                owner: { select: { id: true, firstName: true, lastName: true, email: true } },
                activities: { orderBy: { createdAt: 'desc' }, take: 20 },
                notes: { orderBy: { createdAt: 'desc' } },
                tasks: { orderBy: { dueDate: 'asc' } },
            },
        });
    }
    async createLead(data) {
        return this.prisma.lead.create({ data });
    }
    async updateLead(id, data) {
        return this.prisma.lead.update({ where: { id }, data });
    }
    async softDeleteLead(id, deletedBy) {
        return this.prisma.lead.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy },
        });
    }
    async addActivity(data) {
        return this.prisma.leadActivity.create({ data });
    }
    async addNote(data) {
        return this.prisma.leadNote.create({ data });
    }
    async addTask(data) {
        return this.prisma.leadTask.create({ data });
    }
    async completeTask(taskId) {
        return this.prisma.leadTask.update({
            where: { id: taskId },
            data: { isCompleted: true, completedAt: new Date() },
        });
    }
    async getPipelineStats(tenantId) {
        const stages = await this.prisma.lead.groupBy({
            by: ['stage'],
            where: { tenantId, deletedAt: null },
            _count: { id: true },
        });
        return stages.map(s => ({ stage: s.stage, count: s._count.id }));
    }
    async getLeadSourceStats(tenantId) {
        const sources = await this.prisma.lead.groupBy({
            by: ['source'],
            where: { tenantId, deletedAt: null },
            _count: { id: true },
        });
        return sources.map(s => ({ source: s.source, count: s._count.id }));
    }
};
exports.CrmRepository = CrmRepository;
exports.CrmRepository = CrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CrmRepository);
//# sourceMappingURL=crm.repository.js.map