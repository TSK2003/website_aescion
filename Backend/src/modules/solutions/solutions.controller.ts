import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Solutions')
@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  // Public Endpoints
  @Get('public')
  @ApiOperation({ summary: 'Get published solutions (public)' })
  async getPublicSolutions() {
    return this.solutionsService.getPublicSolutions();
  }

  @Get('public/:slug')
  @ApiOperation({ summary: 'Get published solution by slug (public)' })
  async getPublicSolutionBySlug(@Param('slug') slug: string) {
    return this.solutionsService.getPublicSolutionBySlug(slug);
  }

  // Admin Endpoints
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all solutions (admin)' })
  async getAllSolutions(@CurrentUser() user: any) {
    return this.solutionsService.getAllSolutions(user.tenantId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create solution (admin)' })
  async createSolution(@CurrentUser() user: any, @Body() dto: CreateSolutionDto) {
    return this.solutionsService.createSolution(user.tenantId, dto, user.id);
  }

  @Put(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update solution (admin)' })
  async updateSolution(
    @Param('slug') slug: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateSolutionDto,
  ) {
    return this.solutionsService.updateSolution(user.tenantId, slug, dto, user.id);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete solution (admin)' })
  async deleteSolution(@Param('slug') slug: string, @CurrentUser() user: any) {
    return this.solutionsService.deleteSolution(user.tenantId, slug);
  }
}
