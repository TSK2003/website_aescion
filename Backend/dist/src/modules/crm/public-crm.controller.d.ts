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
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        tags: string[];
        priority: import("@prisma/client").$Enums.LeadPriority;
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        stage: import("@prisma/client").$Enums.LeadPipelineStage;
        source: import("@prisma/client").$Enums.LeadSource;
        ownerId: string | null;
        company: string | null;
        designation: string | null;
        budget: string | null;
        requirement: string | null;
        convertedAt: Date | null;
        lastContactAt: Date | null;
    }>;
}
