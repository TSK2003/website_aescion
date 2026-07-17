import { EmailRepository } from './email.repository';
export declare class EmailService {
    private readonly emailRepo;
    constructor(emailRepo: EmailRepository);
    getTemplates(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        name: string;
        type: string;
        subject: string;
        body: string;
        variables: string[];
        isActive: boolean;
    }[]>;
    getLogs(tenantId: string): Promise<{
        status: import("@prisma/client").$Enums.EmailStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        subject: string;
        body: string;
        templateId: string | null;
        to: string;
        cc: string | null;
        bcc: string | null;
        attempts: number;
        sentAt: Date | null;
        errorMessage: string | null;
    }[]>;
    sendEmail(tenantId: string, to: string, templateSlug: string, variables: any): Promise<{
        status: string;
        message: string;
    }>;
}
