import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Applications (HR & Training)')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly appsService: ApplicationsService) {}

  @Post('submit')
  @ApiOperation({ summary: 'Submit a new application (Public Website Form)' })
  async submitApplication(@Body() body: any) {
    // In production, we'd extract tenantId from origin or API key.
    const defaultTenantId =
      process.env.DEFAULT_TENANT_ID || '00000000-0000-0000-0000-000000000001';
    return this.appsService.submitApplication(defaultTenantId, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN', 'HR')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all applications with filters (admin)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getAllApplications(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.appsService.getAllApplications(user.tenantId, {
      page,
      limit,
      type,
      status,
      search,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN', 'HR')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get application details' })
  async getApplicationById(@Param('id') id: string) {
    return this.appsService.getApplicationById(id);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN', 'HR')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application status' })
  async updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { status: string },
  ) {
    return this.appsService.updateStatus(id, body.status, user.id);
  }

  @Put(':id/assign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN', 'HR')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign application to HR member' })
  async assignUser(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { assigneeId: string },
  ) {
    return this.appsService.assignUser(id, body.assigneeId, user.id);
  }
}
