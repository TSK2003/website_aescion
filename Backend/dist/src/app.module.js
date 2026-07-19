"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const cache_manager_1 = require("@nestjs/cache-manager");
const bullmq_1 = require("@nestjs/bullmq");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./modules/database/database.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const roles_module_1 = require("./modules/roles/roles.module");
const cms_module_1 = require("./modules/cms/cms.module");
const crm_module_1 = require("./modules/crm/crm.module");
const media_module_1 = require("./modules/media/media.module");
const applications_module_1 = require("./modules/applications/applications.module");
const email_module_1 = require("./modules/email/email.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const settings_module_1 = require("./modules/settings/settings.module");
const blogs_module_1 = require("./modules/blogs/blogs.module");
const organization_module_1 = require("./modules/organization/organization.module");
const erp_module_1 = require("./modules/erp/erp.module");
const hrms_module_1 = require("./modules/hrms/hrms.module");
const lms_module_1 = require("./modules/lms/lms.module");
const ai_module_1 = require("./modules/ai/ai.module");
const integrations_module_1 = require("./modules/integrations/integrations.module");
const health_module_1 = require("./modules/health/health.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT || '6379'),
                },
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            cms_module_1.CmsModule,
            crm_module_1.CrmModule,
            media_module_1.MediaModule,
            applications_module_1.ApplicationsModule,
            email_module_1.EmailModule,
            notifications_module_1.NotificationsModule,
            analytics_module_1.AnalyticsModule,
            dashboard_module_1.DashboardModule,
            settings_module_1.SettingsModule,
            blogs_module_1.BlogsModule,
            organization_module_1.OrganizationModule,
            erp_module_1.ErpModule,
            hrms_module_1.HrmsModule,
            lms_module_1.LmsModule,
            ai_module_1.AiModule,
            integrations_module_1.IntegrationsModule,
            health_module_1.HealthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map