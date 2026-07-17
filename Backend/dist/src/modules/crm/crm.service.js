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
exports.CrmService = void 0;
const common_1 = require("@nestjs/common");
const crm_repository_1 = require("./crm.repository");
let CrmService = class CrmService {
    crmRepo;
    constructor(crmRepo) {
        this.crmRepo = crmRepo;
    }
    async getAllLeads(tenantId, options) {
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;
        const result = await this.crmRepo.findAllLeads(tenantId, {
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
    async getLeadById(id) {
        const lead = await this.crmRepo.findLeadById(id);
        if (!lead)
            throw new common_1.NotFoundException(`Lead "${id}" not found`);
        return lead;
    }
    async createLead(tenantId, dto, userId) {
        return this.crmRepo.createLead({
            tenant: { connect: { id: tenantId } },
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phone: dto.phone,
            company: dto.company,
            designation: dto.designation,
            source: dto.source,
            priority: dto.priority,
            requirement: dto.requirement,
            createdBy: userId,
        });
    }
    async updateLead(id, dto, userId) {
        await this.getLeadById(id);
        return this.crmRepo.updateLead(id, { ...dto, updatedBy: userId });
    }
    async deleteLead(id, userId) {
        await this.getLeadById(id);
        return this.crmRepo.softDeleteLead(id, userId);
    }
    async updateStage(id, stage, userId) {
        const lead = await this.getLeadById(id);
        const oldStage = lead.stage;
        await this.crmRepo.updateLead(id, { stage: stage, updatedBy: userId });
        await this.crmRepo.addActivity({
            lead: { connect: { id } },
            user: { connect: { id: userId } },
            type: 'stage_change',
            description: `Pipeline stage changed from ${oldStage} to ${stage}`,
        });
        return this.getLeadById(id);
    }
    async addNote(leadId, content, userId) {
        await this.getLeadById(leadId);
        return this.crmRepo.addNote({
            lead: { connect: { id: leadId } },
            user: { connect: { id: userId } },
            content,
        });
    }
    async addTask(leadId, title, description, dueDate) {
        await this.getLeadById(leadId);
        return this.crmRepo.addTask({
            lead: { connect: { id: leadId } },
            title,
            description,
            dueDate,
        });
    }
    async getPipelineStats(tenantId) {
        return this.crmRepo.getPipelineStats(tenantId);
    }
    async getLeadSourceStats(tenantId) {
        return this.crmRepo.getLeadSourceStats(tenantId);
    }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crm_repository_1.CrmRepository])
], CrmService);
//# sourceMappingURL=crm.service.js.map