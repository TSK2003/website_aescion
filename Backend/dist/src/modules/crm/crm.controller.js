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
exports.CrmController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crm_service_1 = require("./crm.service");
const create_lead_dto_1 = require("./dto/create-lead.dto");
const update_lead_dto_1 = require("./dto/update-lead.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let CrmController = class CrmController {
    crmService;
    constructor(crmService) {
        this.crmService = crmService;
    }
    async getAllLeads(user, page, limit, stage, source, priority, search) {
        return this.crmService.getAllLeads(user.tenantId, {
            page,
            limit,
            stage,
            source,
            priority,
            search,
        });
    }
    async getPipelineStats(user) {
        return this.crmService.getPipelineStats(user.tenantId);
    }
    async getSourceStats(user) {
        return this.crmService.getLeadSourceStats(user.tenantId);
    }
    async getLeadById(id) {
        return this.crmService.getLeadById(id);
    }
    async createLead(user, dto) {
        return this.crmService.createLead(user.tenantId, dto, user.id);
    }
    async updateLead(id, user, dto) {
        return this.crmService.updateLead(id, dto, user.id);
    }
    async updateStage(id, user, body) {
        return this.crmService.updateStage(id, body.stage, user.id);
    }
    async addNote(id, user, body) {
        return this.crmService.addNote(id, body.content, user.id);
    }
    async deleteLead(id, user) {
        return this.crmService.deleteLead(id, user.id);
    }
};
exports.CrmController = CrmController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'List all leads with filters' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'stage', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'source', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'priority', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('stage')),
    __param(4, (0, common_1.Query)('source')),
    __param(5, (0, common_1.Query)('priority')),
    __param(6, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "getAllLeads", null);
__decorate([
    (0, common_1.Get)('stats/pipeline'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pipeline stage statistics' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "getPipelineStats", null);
__decorate([
    (0, common_1.Get)('stats/sources'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lead source statistics' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "getSourceStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lead by ID with full timeline' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "getLeadById", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lead' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_lead_dto_1.CreateLeadDto]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "createLead", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing lead' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_lead_dto_1.UpdateLeadDto]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "updateLead", null);
__decorate([
    (0, common_1.Put)(':id/stage'),
    (0, common_1.Patch)(':id/stage'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lead pipeline stage' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Post)(':id/notes'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a note to a lead' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "addNote", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a lead' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "deleteLead", null);
exports.CrmController = CrmController = __decorate([
    (0, swagger_1.ApiTags)('CRM - Leads'),
    (0, common_1.Controller)(['crm/leads', 'leads']),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [crm_service_1.CrmService])
], CrmController);
//# sourceMappingURL=crm.controller.js.map