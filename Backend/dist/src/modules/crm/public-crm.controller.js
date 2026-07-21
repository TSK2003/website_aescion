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
exports.PublicCrmController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crm_service_1 = require("./crm.service");
const create_lead_dto_1 = require("./dto/create-lead.dto");
const prisma_service_1 = require("../database/prisma.service");
let PublicCrmController = class PublicCrmController {
    crmService;
    prisma;
    constructor(crmService, prisma) {
        this.crmService = crmService;
        this.prisma = prisma;
    }
    async createPublicLead(dto) {
        const tenant = await this.prisma.tenant.findFirst();
        if (!tenant)
            throw new Error('No tenant configured');
        const superAdmin = await this.prisma.user.findFirst({ where: { role: { name: 'Super Admin' } } });
        return this.crmService.createLead(tenant.id, dto, superAdmin ? superAdmin.id : tenant.id);
    }
};
exports.PublicCrmController = PublicCrmController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new lead from the public website' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lead_dto_1.CreateLeadDto]),
    __metadata("design:returntype", Promise)
], PublicCrmController.prototype, "createPublicLead", null);
exports.PublicCrmController = PublicCrmController = __decorate([
    (0, swagger_1.ApiTags)('Public - Website Integrations'),
    (0, common_1.Controller)('public/leads'),
    __metadata("design:paramtypes", [crm_service_1.CrmService,
        prisma_service_1.PrismaService])
], PublicCrmController);
//# sourceMappingURL=public-crm.controller.js.map