import { PrismaService } from './modules/database/prisma.service';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    search(query: string): Promise<{
        id: string;
        title: string;
        href: string;
        category: string;
        description: string | null;
    }[]>;
}
