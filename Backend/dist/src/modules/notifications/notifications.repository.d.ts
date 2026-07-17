import { PrismaService } from '../database/prisma.service';
export declare class NotificationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserNotifications(tenantId: string, userId: string): Promise<{
        status: import("@prisma/client").$Enums.NotificationStatus;
        id: string;
        tenantId: string;
        title: string;
        createdAt: Date;
        type: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string;
        message: string;
        channel: import("@prisma/client").$Enums.NotificationChannel;
        actionUrl: string | null;
        readAt: Date | null;
    }[]>;
    markAsRead(tenantId: string, id: string): Promise<{
        status: import("@prisma/client").$Enums.NotificationStatus;
        id: string;
        tenantId: string;
        title: string;
        createdAt: Date;
        type: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string;
        message: string;
        channel: import("@prisma/client").$Enums.NotificationChannel;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
}
