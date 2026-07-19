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
import { CrmService } from './crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('CRM - Leads')
@Controller('leads')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'List all leads with filters' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'stage', required: false })
  @ApiQuery({ name: 'source', required: false })
  @ApiQuery({ name: 'priority', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getAllLeads(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('stage') stage?: string,
    @Query('source') source?: string,
    @Query('priority') priority?: string,
    @Query('search') search?: string,
  ) {
    return this.crmService.getAllLeads(user.tenantId, {
      page,
      limit,
      stage,
      source,
      priority,
      search,
    });
  }

  @Get('stats/pipeline')
  @Roles('SUPER_ADMIN', 'ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Get pipeline stage statistics' })
  async getPipelineStats(@CurrentUser() user: any) {
    return this.crmService.getPipelineStats(user.tenantId);
  }

  @Get('stats/sources')
  @Roles('SUPER_ADMIN', 'ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Get lead source statistics' })
  async getSourceStats(@CurrentUser() user: any) {
    return this.crmService.getLeadSourceStats(user.tenantId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Get lead by ID with full timeline' })
  async getLeadById(@Param('id') id: string) {
    return this.crmService.getLeadById(id);
  }

  @Post()
  @Roles('SUPER_ADMIN', 'ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Create a new lead' })
  async createLead(@CurrentUser() user: any, @Body() dto: CreateLeadDto) {
    return this.crmService.createLead(user.tenantId, dto, user.id);
  }

  @Put(':id')
  @Roles('SUPER_ADMIN', 'ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Update an existing lead' })
  async updateLead(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateLeadDto,
  ) {
    return this.crmService.updateLead(id, dto, user.id);
  }

  @Put(':id/stage')
  @Roles('SUPER_ADMIN', 'ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Update lead pipeline stage' })
  async updateStage(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { stage: string },
  ) {
    return this.crmService.updateStage(id, body.stage, user.id);
  }

  @Post(':id/notes')
  @Roles('SUPER_ADMIN', 'ADMIN', 'MANAGER')
  @ApiOperation({ summary: 'Add a note to a lead' })
  async addNote(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { content: string },
  ) {
    return this.crmService.addNote(id, body.content, user.id);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Soft delete a lead' })
  async deleteLead(@Param('id') id: string, @CurrentUser() user: any) {
    return this.crmService.deleteLead(id, user.id);
  }
}
