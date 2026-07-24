import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    getTemplates(user: any): Promise<{
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
    getLogs(user: any): Promise<{
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
}
