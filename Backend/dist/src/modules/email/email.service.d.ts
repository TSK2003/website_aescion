import { EmailRepository } from './email.repository';
export declare class EmailService {
    private readonly emailRepo;
    private transporter;
    private readonly logger;
    constructor(emailRepo: EmailRepository);
    getTemplates(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        subject: string;
        body: string;
        variables: string[];
        type: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
    }[]>;
    getLogs(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        subject: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
        templateId: string | null;
        to: string;
        cc: string | null;
        bcc: string | null;
        status: import("@prisma/client").$Enums.EmailStatus;
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
