import { CrmService } from './crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { PrismaService } from '../database/prisma.service';
export declare class PublicCrmController {
    private readonly crmService;
    private readonly prisma;
    constructor(crmService: CrmService, prisma: PrismaService);
    createPublicLead(dto: CreateLeadDto): Promise<{
        id: string;
        tenantId: string;
        ownerId: string | null;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        company: string | null;
        designation: string | null;
        source: import("@prisma/client").$Enums.LeadSource;
        priority: import("@prisma/client").$Enums.LeadPriority;
        stage: import("@prisma/client").$Enums.LeadPipelineStage;
        tags: string[];
        budget: string | null;
        requirement: string | null;
        status: import("@prisma/client").$Enums.RecordStatus;
        convertedAt: Date | null;
        lastContactAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
    }>;
}
