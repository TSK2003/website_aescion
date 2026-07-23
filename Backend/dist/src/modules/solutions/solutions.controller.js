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
exports.SolutionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const solutions_service_1 = require("./solutions.service");
const create_solution_dto_1 = require("./dto/create-solution.dto");
const update_solution_dto_1 = require("./dto/update-solution.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let SolutionsController = class SolutionsController {
    solutionsService;
    constructor(solutionsService) {
        this.solutionsService = solutionsService;
    }
    async getPublicSolutions() {
        return this.solutionsService.getPublicSolutions();
    }
    async getPublicSolutionBySlug(slug) {
        return this.solutionsService.getPublicSolutionBySlug(slug);
    }
    async getAllSolutions(user) {
        return this.solutionsService.getAllSolutions(user.tenantId);
    }
    async createSolution(user, dto) {
        return this.solutionsService.createSolution(user.tenantId, dto, user.id);
    }
    async updateSolution(slug, user, dto) {
        return this.solutionsService.updateSolution(user.tenantId, slug, dto, user.id);
    }
    async deleteSolution(slug, user) {
        return this.solutionsService.deleteSolution(user.tenantId, slug);
    }
};
exports.SolutionsController = SolutionsController;
__decorate([
    (0, common_1.Get)('public'),
    (0, swagger_1.ApiOperation)({ summary: 'Get published solutions (public)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SolutionsController.prototype, "getPublicSolutions", null);
__decorate([
    (0, common_1.Get)('public/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get published solution by slug (public)' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SolutionsController.prototype, "getPublicSolutionBySlug", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all solutions (admin)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SolutionsController.prototype, "getAllSolutions", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create solution (admin)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_solution_dto_1.CreateSolutionDto]),
    __metadata("design:returntype", Promise)
], SolutionsController.prototype, "createSolution", null);
__decorate([
    (0, common_1.Put)(':slug'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update solution (admin)' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_solution_dto_1.UpdateSolutionDto]),
    __metadata("design:returntype", Promise)
], SolutionsController.prototype, "updateSolution", null);
__decorate([
    (0, common_1.Delete)(':slug'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete solution (admin)' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SolutionsController.prototype, "deleteSolution", null);
exports.SolutionsController = SolutionsController = __decorate([
    (0, swagger_1.ApiTags)('Solutions'),
    (0, common_1.Controller)('solutions'),
    __metadata("design:paramtypes", [solutions_service_1.SolutionsService])
], SolutionsController);
//# sourceMappingURL=solutions.controller.js.map