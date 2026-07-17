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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const applications_repository_1 = require("./applications.repository");
let ApplicationsService = class ApplicationsService {
    appsRepo;
    constructor(appsRepo) {
        this.appsRepo = appsRepo;
    }
    async getAllApplications(tenantId, options) {
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;
        const result = await this.appsRepo.findAll(tenantId, { ...options, skip, take: limit });
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
    async getApplicationById(id) {
        const app = await this.appsRepo.findById(id);
        if (!app)
            throw new common_1.NotFoundException(`Application "${id}" not found`);
        return app;
    }
    async submitApplication(tenantId, data) {
        return this.appsRepo.create({
            tenant: { connect: { id: tenantId } },
            type: data.type,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            college: data.college,
            degree: data.degree,
            position: data.position,
            resumeUrl: data.resumeUrl,
            portfolioUrl: data.portfolioUrl,
            coverLetter: data.coverLetter,
            status: 'SUBMITTED',
        });
    }
    async updateStatus(id, status, userId) {
        await this.getApplicationById(id);
        return this.appsRepo.update(id, { status: status, updatedBy: userId });
    }
    async assignUser(id, assigneeId, userId) {
        await this.getApplicationById(id);
        return this.appsRepo.update(id, { assignee: { connect: { id: assigneeId } }, updatedBy: userId });
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [applications_repository_1.ApplicationsRepository])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map