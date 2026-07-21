import { Module } from '@nestjs/common';
import { CrmController } from './crm.controller';
import { PublicCrmController } from './public-crm.controller';
import { CrmService } from './crm.service';
import { CrmRepository } from './crm.repository';
import { EmailModule } from '../email/email.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [EmailModule, DatabaseModule],
  controllers: [CrmController, PublicCrmController],
  providers: [CrmService, CrmRepository],
  exports: [CrmService],
})
export class CrmModule {}
