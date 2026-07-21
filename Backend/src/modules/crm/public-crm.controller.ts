import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrmService } from './crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { PrismaService } from '../database/prisma.service';

@ApiTags('Public - Website Integrations')
@Controller('public/leads')
export class PublicCrmController {
  constructor(
    private readonly crmService: CrmService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new lead from the public website' })
  async createPublicLead(@Body() dto: CreateLeadDto) {
    // For public submissions, use the default tenant and a system user
    const tenant = await this.prisma.tenant.findFirst();
    if (!tenant) throw new Error('No tenant configured');
    
    // Pass null or a specific system user ID for createdBy if possible, or just the tenantId
    // crmService expects tenantId, dto, userId
    // We'll use a dummy ID or the first super admin
    const superAdmin = await this.prisma.user.findFirst({ where: { role: { name: 'Super Admin' } } });
    
    return this.crmService.createLead(
      tenant.id, 
      dto, 
      superAdmin ? superAdmin.id : tenant.id
    );
  }
}
