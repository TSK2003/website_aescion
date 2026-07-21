import { PrismaService } from '../database/prisma.service';
export declare class NotificationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserNotifications(tenantId: string, userId: string): Promise<{
        id: string;
        tenantId: string;
        type: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.NotificationStatus;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        title: string;
        message: string;
        userId: string;
        channel: import("@prisma/client").$Enums.NotificationChannel;
        actionUrl: string | null;
        readAt: Date | null;
    }[]>;
    markAsRead(tenantId: string, id: string): Promise<{
        id: string;
        tenantId: string;
        type: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.NotificationStatus;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        title: string;
        message: string;
        userId: string;
        channel: import("@prisma/client").$Enums.NotificationChannel;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
}
