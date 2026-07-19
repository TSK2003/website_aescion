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
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Media Library')
@Controller('media')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // ==================== FOLDERS ====================

  @Get('folders')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'List media folders' })
  @ApiQuery({ name: 'parentId', required: false })
  async getFolders(
    @CurrentUser() user: any,
    @Query('parentId') parentId?: string,
  ) {
    return this.mediaService.getFolders(user.tenantId, parentId);
  }

  @Post('folders')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Create a new folder' })
  async createFolder(
    @CurrentUser() user: any,
    @Body() body: { name: string; parentId?: string },
  ) {
    return this.mediaService.createFolder(
      user.tenantId,
      body.name,
      body.parentId,
      user.id,
    );
  }

  // ==================== FILES ====================

  @Get('files')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'List media files with filters' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'folderId', required: false })
  @ApiQuery({ name: 'mediaType', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getFiles(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('folderId') folderId?: string,
    @Query('mediaType') mediaType?: string,
    @Query('search') search?: string,
  ) {
    return this.mediaService.getFiles(user.tenantId, {
      page,
      limit,
      folderId,
      mediaType,
      search,
    });
  }

  @Post('files/register')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Register an uploaded file in the database' })
  async registerFile(@CurrentUser() user: any, @Body() body: any) {
    // In a real app, you'd have an interceptor/middleware for actual file upload (S3/Multer)
    // This endpoint registers the metadata after upload
    return this.mediaService.registerFile(user.tenantId, body, user.id);
  }

  @Put('files/:id')
  @Roles('SUPER_ADMIN', 'ADMIN', 'EDITOR')
  @ApiOperation({ summary: 'Update file metadata (alt text, caption)' })
  async updateFile(@Param('id') id: string, @Body() body: any) {
    return this.mediaService.updateFile(id, body);
  }

  @Delete('files/:id')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Delete a media file' })
  async deleteFile(@Param('id') id: string, @CurrentUser() user: any) {
    return this.mediaService.deleteFile(id, user.id);
  }
}
