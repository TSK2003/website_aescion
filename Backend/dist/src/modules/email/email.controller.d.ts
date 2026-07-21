import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    getTemplates(user: any): Promise<{
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
    getLogs(user: any): Promise<{
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
}
