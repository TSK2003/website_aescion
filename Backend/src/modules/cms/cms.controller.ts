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
import { CmsService } from './cms.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('CMS - Pages')
@Controller('pages')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  // ==================== PUBLIC ====================

  @Get('public/:slug')
  @ApiOperation({ summary: 'Get a published page by slug (public)' })
  async getPublicPage(@Param('slug') slug: string) {
    return this.cmsService.getPageBySlug(slug);
  }

  // ==================== ADMIN ====================

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all pages (admin)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'],
  })
  async getAllPages(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.cmsService.getAllPages(
      user.tenantId,
      page || 1,
      limit || 10,
      status,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get page by ID with blocks and versions (admin)' })
  async getPageById(@Param('id') id: string) {
    return this.cmsService.getPageById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new page' })
  async createPage(@CurrentUser() user: any, @Body() dto: CreatePageDto) {
    return this.cmsService.createPage(user.tenantId, dto, user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing page' })
  async updatePage(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdatePageDto,
  ) {
    return this.cmsService.updatePage(id, dto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a page' })
  async deletePage(@Param('id') id: string, @CurrentUser() user: any) {
    return this.cmsService.deletePage(id, user.id);
  }

  @Post(':id/version')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a version snapshot of a page' })
  async createVersion(@Param('id') id: string, @CurrentUser() user: any) {
    return this.cmsService.createPageVersion(id, user.id);
  }

  @Put(':id/blocks/reorder')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reorder blocks within a page' })
  async reorderBlocks(
    @Param('id') id: string,
    @Body() body: { blockIds: string[] },
  ) {
    return this.cmsService.reorderBlocks(id, body.blockIds);
  }
}
