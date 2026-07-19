import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('public')
  @ApiOperation({ summary: 'Get public system settings' })
  async getPublicSettings() {
    const defaultTenantId =
      process.env.DEFAULT_TENANT_ID || '00000000-0000-0000-0000-000000000001';
    return this.settingsService.getPublicSettings(defaultTenantId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all system settings (admin)' })
  async getAllSettings(@CurrentUser() user: any) {
    return this.settingsService.getAllSettings(user.tenantId);
  }

  @Get(':group/:key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific setting by group and key' })
  async getSetting(
    @Param('group') group: string,
    @Param('key') key: string,
    @CurrentUser() user: any,
  ) {
    return this.settingsService.getSetting(user.tenantId, group, key);
  }

  @Put(':group/:key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a specific setting' })
  async updateSetting(
    @Param('group') group: string,
    @Param('key') key: string,
    @CurrentUser() user: any,
    @Body() body: { value: any; isPublic?: boolean; description?: string },
  ) {
    return this.settingsService.updateSetting(
      user.tenantId,
      group,
      key,
      body.value,
      body.isPublic || false,
      body.description || '',
      user.id,
    );
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update multiple settings in bulk' })
  async updateBulkSettings(
    @CurrentUser() user: any,
    @Body() body: { settings: any[] },
  ) {
    return this.settingsService.updateBulkSettings(
      user.tenantId,
      body.settings,
      user.id,
    );
  }
}
