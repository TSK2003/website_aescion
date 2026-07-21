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
                firstName: string;
                lastName: string;
                email: string;
            } | null;
        } & {
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
            firstName: string;
            lastName: string;
            email: string;
        } | null;
        activities: {
            id: string;
            createdAt: Date;
            leadId: string;
            userId: string | null;
            type: string;
            description: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
        notes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            leadId: string;
            userId: string | null;
            content: string;
            isPinned: boolean;
        }[];
        tasks: {
            id: string;
            priority: import("@prisma/client").$Enums.LeadPriority;
            createdAt: Date;
            updatedAt: Date;
            dueDate: Date | null;
            leadId: string;
            description: string | null;
            title: string;
            isCompleted: boolean;
            completedAt: Date | null;
        }[];
    } & {
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
    createLead(user: any, dto: CreateLeadDto): Promise<{
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
    updateLead(id: string, user: any, dto: UpdateLeadDto): Promise<{
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
    updateStage(id: string, user: any, body: {
        stage: string;
    }): Promise<{
        owner: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        } | null;
        activities: {
            id: string;
            createdAt: Date;
            leadId: string;
            userId: string | null;
            type: string;
            description: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
        notes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            leadId: string;
            userId: string | null;
            content: string;
            isPinned: boolean;
        }[];
        tasks: {
            id: string;
            priority: import("@prisma/client").$Enums.LeadPriority;
            createdAt: Date;
            updatedAt: Date;
            dueDate: Date | null;
            leadId: string;
            description: string | null;
            title: string;
            isCompleted: boolean;
            completedAt: Date | null;
        }[];
    } & {
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
    addNote(id: string, user: any, body: {
        content: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        leadId: string;
        userId: string | null;
        content: string;
        isPinned: boolean;
    }>;
    deleteLead(id: string, user: any): Promise<{
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
