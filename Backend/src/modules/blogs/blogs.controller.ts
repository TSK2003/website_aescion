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
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCategoryTagDto } from './dto/category-tag.dto';

@ApiTags('Blog')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // ==================== PUBLIC ====================

  @Get('public')
  @ApiOperation({ summary: 'List published blogs (public)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getPublicBlogs(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('category') categoryId?: string,
    @Query('tag') tagId?: string,
    @Query('search') search?: string,
  ) {
    // For public, hardcode tenantId to default and status to PUBLISHED
    const defaultTenantId =
      process.env.DEFAULT_TENANT_ID || '00000000-0000-0000-0000-000000000001';
    return this.blogsService.getAll(defaultTenantId, {
      page,
      limit,
      status: 'PUBLISHED',
      categoryId,
      tagId,
      search,
    });
  }

  @Get('public/:slug')
  @ApiOperation({ summary: 'Get a published blog by slug (public)' })
  async getPublicBlog(@Param('slug') slug: string) {
    return this.blogsService.getBySlug(slug);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a published blog by slug' })
  async getBlogBySlugPublic(@Param('slug') slug: string) {
    return this.blogsService.getBySlug(slug);
  }

  // ==================== ADMIN ====================

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all blogs (admin)' })
  async getAllBlogs(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.blogsService.getAll(user.tenantId, { page, limit, status });
  }

  @Get('categories')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all categories' })
  async getCategories(@CurrentUser() user: any) {
    return this.blogsService.getCategories(user.tenantId);
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a category' })
  async createCategory(
    @CurrentUser() user: any,
    @Body() dto: CreateCategoryTagDto,
  ) {
    return this.blogsService.createCategory(user.tenantId, dto.name, dto.slug);
  }

  @Get('tags')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all tags' })
  async getTags(@CurrentUser() user: any) {
    return this.blogsService.getTags(user.tenantId);
  }

  @Post('tags')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a tag' })
  async createTag(@CurrentUser() user: any, @Body() dto: CreateCategoryTagDto) {
    return this.blogsService.createTag(user.tenantId, dto.name, dto.slug);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get blog by ID (admin)' })
  async getBlogById(@Param('id') id: string) {
    return this.blogsService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a blog post' })
  async createBlog(@CurrentUser() user: any, @Body() dto: CreateBlogDto) {
    return this.blogsService.create(user.tenantId, dto, user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a blog post' })
  async updateBlog(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.blogsService.update(id, dto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a blog post' })
  async deleteBlog(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blogsService.delete(id, user.id);
  }
}
