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
const email_service_1 = require("../email/email.service");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
let CrmService = class CrmService {
    crmRepo;
    emailService;
    auditLogsService;
    constructor(crmRepo, emailService, auditLogsService) {
        this.crmRepo = crmRepo;
        this.emailService = emailService;
        this.auditLogsService = auditLogsService;
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
        const lead = await this.crmRepo.createLead({
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
        const userHtml = `
      <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f8fafc; border-radius: 12px;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border-top: 4px solid #2563eb;">
          <h2 style="color: #1e293b; font-size: 24px; font-weight: 700; margin-bottom: 24px; text-align: center;">Thank You for Reaching Out!</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">Hi ${dto.firstName},</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Thank you for contacting <strong>AESCION</strong>. We have received your inquiry and our technology team is currently reviewing your request.</p>
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="color: #334155; font-size: 14px; margin: 0 0 8px 0;"><strong>Inquiry Details:</strong></p>
            <p style="color: #475569; font-size: 14px; margin: 0;">We'll get back to you at <em>${dto.email}</em> within 24-48 business hours to discuss how we can assist you with your technology requirements.</p>
          </div>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">If you have any urgent questions, feel free to reply directly to this email.</p>
          <div style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
            <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">Best Regards,</p>
            <p style="color: #3b82f6; font-size: 16px; font-weight: 600; margin: 4px 0 0 0;">The AESCION Team</p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 16px;">&copy; ${new Date().getFullYear()} AESCION Enterprise Software Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;
        try {
            await this.emailService.sendEmail(dto.email, 'Thank you for your Enquiry - Aescion', userHtml);
            const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'contact.aescion@gmail.com';
            const adminHtml = `<p>New Lead Received: ${dto.firstName} ${dto.lastName} (${dto.email}). Phone: ${dto.phone || 'N/A'}. Requirement: ${dto.requirement || 'N/A'}</p>`;
            await this.emailService.sendEmail(adminEmail, `New Lead from ${dto.firstName}`, adminHtml);
        }
        catch (emailErr) {
            console.warn('[CRM] Lead saved to DB, but SMTP email notification failed:', emailErr);
        }
        return lead;
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
        await this.crmRepo.updateLead(id, {
            stage: stage,
            updatedBy: userId,
        });
        await this.crmRepo.addActivity({
            lead: { connect: { id } },
            user: { connect: { id: userId } },
            type: 'stage_change',
            description: `Pipeline stage changed from ${oldStage} to ${stage}`,
        });
        await this.auditLogsService.logAction({
            tenantId: lead.tenantId,
            userId,
            module: 'CRM',
            action: 'LEAD_STAGE_UPDATE',
            entityId: id,
            entityType: 'Lead',
            oldValue: { stage: oldStage },
            newValue: { stage },
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
    __metadata("design:paramtypes", [crm_repository_1.CrmRepository,
        email_service_1.EmailService,
        audit_logs_service_1.AuditLogsService])
], CrmService);
//# sourceMappingURL=crm.service.js.map