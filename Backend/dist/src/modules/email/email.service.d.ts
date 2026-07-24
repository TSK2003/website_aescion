import { EmailRepository } from './email.repository';
export declare class EmailService {
    private readonly emailRepo;
    private transporter;
    private readonly logger;
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
        id: string;
        tenantId: string;
        status: import("@prisma/client").$Enums.EmailStatus;
        createdAt: Date;
        updatedAt: Date;
        subject: string;
        body: string;
        templateId: string | null;
        to: string;
        cc: string | null;
        bcc: string | null;
        attempts: number;
        sentAt: Date | null;
        errorMessage: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
    sendEmail(to: string, subject: string, html: string): Promise<{
        status: string;
        message: string;
    }>;
}
