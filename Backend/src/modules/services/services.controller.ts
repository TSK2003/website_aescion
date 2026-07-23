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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Public Endpoints
  @Get('public')
  @ApiOperation({ summary: 'Get published services (public)' })
  async getPublicServices() {
    return this.servicesService.getPublicServices();
  }

  @Get('public/:slug')
  @ApiOperation({ summary: 'Get published service detail by slug (public)' })
  async getPublicServiceBySlug(@Param('slug') slug: string) {
    return this.servicesService.getPublicServiceBySlug(slug);
  }

  // Admin Endpoints
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all services (admin)' })
  async getAllServices(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.servicesService.getAllServices(
      user.tenantId,
      page || 1,
      limit || 50,
      status,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get service by ID (admin)' })
  async getServiceById(@Param('id') id: string) {
    return this.servicesService.getServiceById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new service (admin)' })
  async createService(@CurrentUser() user: any, @Body() dto: CreateServiceDto) {
    return this.servicesService.createService(user.tenantId, dto, user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing service (admin)' })
  async updateService(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateServiceDto,
  ) {
    return this.servicesService.updateService(id, dto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a service (admin)' })
  async deleteService(@Param('id') id: string, @CurrentUser() user: any) {
    return this.servicesService.deleteService(id, user.id);
  }
}
