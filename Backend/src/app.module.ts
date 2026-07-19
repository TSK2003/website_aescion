import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { CmsModule } from './modules/cms/cms.module';
import { CrmModule } from './modules/crm/crm.module';
import { MediaModule } from './modules/media/media.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { EmailModule } from './modules/email/email.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SettingsModule } from './modules/settings/settings.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { ErpModule } from './modules/erp/erp.module';
import { HrmsModule } from './modules/hrms/hrms.module';
import { LmsModule } from './modules/lms/lms.module';
import { AiModule } from './modules/ai/ai.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    CacheModule.register({
      isGlobal: true,
      // store: redisStore, // Uncomment when redis is connected
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    CmsModule,
    CrmModule,
    MediaModule,
    ApplicationsModule,
    EmailModule,
    NotificationsModule,
    AnalyticsModule,
    DashboardModule,
    SettingsModule,
    BlogsModule,
    OrganizationModule,
    ErpModule,
    HrmsModule,
    LmsModule,
    AiModule,
    IntegrationsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
