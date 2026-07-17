import { CrmService } from './crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class CrmController {
    private readonly crmService;
    constructor(crmService: CrmService);
    getAllLeads(user: any, page?: number, limit?: number, stage?: string, source?: string, priority?: string, search?: string): Promise<{
        items: ({
            owner: {
                id: string;
                email: string;
                lastName: string;
                firstName: string;
            } | null;
        } & {
            status: import("@prisma/client").$Enums.RecordStatus;
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            deletedBy: string | null;
            tags: string[];
            stage: import("@prisma/client").$Enums.LeadPipelineStage;
            source: import("@prisma/client").$Enums.LeadSource;
            priority: import("@prisma/client").$Enums.LeadPriority;
            ownerId: string | null;
            company: string | null;
            email: string;
            lastName: string;
            firstName: string;
            phone: string | null;
            designation: string | null;
            budget: string | null;
            requirement: string | null;
            convertedAt: Date | null;
            lastContactAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getPipelineStats(user: any): Promise<{
        stage: import("@prisma/client").$Enums.LeadPipelineStage;
        count: number;
    }[]>;
    getSourceStats(user: any): Promise<{
        source: import("@prisma/client").$Enums.LeadSource;
        count: number;
    }[]>;
    getLeadById(id: string): Promise<{
        owner: {
            id: string;
            email: string;
            lastName: string;
            firstName: string;
        } | null;
        activities: {
            id: string;
            description: string;
            createdAt: Date;
            type: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            leadId: string;
            userId: string | null;
        }[];
        notes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            leadId: string;
            userId: string | null;
            isPinned: boolean;
        }[];
        tasks: {
            id: string;
            title: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            priority: import("@prisma/client").$Enums.LeadPriority;
            dueDate: Date | null;
            leadId: string;
            isCompleted: boolean;
            completedAt: Date | null;
        }[];
    } & {
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        tags: string[];
        stage: import("@prisma/client").$Enums.LeadPipelineStage;
        source: import("@prisma/client").$Enums.LeadSource;
        priority: import("@prisma/client").$Enums.LeadPriority;
        ownerId: string | null;
        company: string | null;
        email: string;
        lastName: string;
        firstName: string;
        phone: string | null;
        designation: string | null;
        budget: string | null;
        requirement: string | null;
        convertedAt: Date | null;
        lastContactAt: Date | null;
    }>;
    createLead(user: any, dto: CreateLeadDto): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        tags: string[];
        stage: import("@prisma/client").$Enums.LeadPipelineStage;
        source: import("@prisma/client").$Enums.LeadSource;
        priority: import("@prisma/client").$Enums.LeadPriority;
        ownerId: string | null;
        company: string | null;
        email: string;
        lastName: string;
        firstName: string;
        phone: string | null;
        designation: string | null;
        budget: string | null;
        requirement: string | null;
        convertedAt: Date | null;
        lastContactAt: Date | null;
    }>;
    updateLead(id: string, user: any, dto: UpdateLeadDto): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        tags: string[];
        stage: import("@prisma/client").$Enums.LeadPipelineStage;
        source: import("@prisma/client").$Enums.LeadSource;
        priority: import("@prisma/client").$Enums.LeadPriority;
        ownerId: string | null;
        company: string | null;
        email: string;
        lastName: string;
        firstName: string;
        phone: string | null;
        designation: string | null;
        budget: string | null;
        requirement: string | null;
        convertedAt: Date | null;
        lastContactAt: Date | null;
    }>;
    updateStage(id: string, user: any, body: {
        stage: string;
    }): Promise<{
        owner: {
            id: string;
            email: string;
            lastName: string;
            firstName: string;
        } | null;
        activities: {
            id: string;
            description: string;
            createdAt: Date;
            type: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            leadId: string;
            userId: string | null;
        }[];
        notes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            leadId: string;
            userId: string | null;
            isPinned: boolean;
        }[];
        tasks: {
            id: string;
            title: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            priority: import("@prisma/client").$Enums.LeadPriority;
            dueDate: Date | null;
            leadId: string;
            isCompleted: boolean;
            completedAt: Date | null;
        }[];
    } & {
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        tags: string[];
        stage: import("@prisma/client").$Enums.LeadPipelineStage;
        source: import("@prisma/client").$Enums.LeadSource;
        priority: import("@prisma/client").$Enums.LeadPriority;
        ownerId: string | null;
        company: string | null;
        email: string;
        lastName: string;
        firstName: string;
        phone: string | null;
        designation: string | null;
        budget: string | null;
        requirement: string | null;
        convertedAt: Date | null;
        lastContactAt: Date | null;
    }>;
    addNote(id: string, user: any, body: {
        content: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        leadId: string;
        userId: string | null;
        isPinned: boolean;
    }>;
    deleteLead(id: string, user: any): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        tags: string[];
        stage: import("@prisma/client").$Enums.LeadPipelineStage;
        source: import("@prisma/client").$Enums.LeadSource;
        priority: import("@prisma/client").$Enums.LeadPriority;
        ownerId: string | null;
        company: string | null;
        email: string;
        lastName: string;
        firstName: string;
        phone: string | null;
        designation: string | null;
        budget: string | null;
        requirement: string | null;
        convertedAt: Date | null;
        lastContactAt: Date | null;
    }>;
}
