import { PrismaService } from '../database/prisma.service';
export declare class NewsletterService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    subscribe(email: string): Promise<{
        id: string;
        tenantId: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }>;
    getAllSubscribers(): Promise<{
        id: string;
        tenantId: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }[]>;
}
