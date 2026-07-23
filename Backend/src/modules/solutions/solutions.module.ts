import { Module } from '@nestjs/common';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';
import { SolutionsRepository } from './solutions.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SolutionsController],
  providers: [SolutionsService, SolutionsRepository],
  exports: [SolutionsService],
})
export class SolutionsModule {}
