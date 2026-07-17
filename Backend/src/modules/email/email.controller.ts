import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Email')
@Controller('email')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('templates')
  @Roles('SUPER_ADMIN', 'ADMIN')
  async getTemplates(@CurrentUser() user: any) {
    return this.emailService.getTemplates(user.tenantId);
  }

  @Get('logs')
  @Roles('SUPER_ADMIN', 'ADMIN')
  async getLogs(@CurrentUser() user: any) {
    return this.emailService.getLogs(user.tenantId);
  }
}
