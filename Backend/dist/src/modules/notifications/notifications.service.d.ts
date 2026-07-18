import { NotificationsRepository } from './notifications.repository';
export declare class NotificationsService {
    private readonly notifRepo;
    constructor(notifRepo: NotificationsRepository);
    getUserNotifications(tenantId: string, userId: string): Promise<{
        status: import("@prisma/client").$Enums.NotificationStatus;
        id: string;
        tenantId: string;
        title: string;
        createdAt: Date;
        type: string;
        message: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string;
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
        message: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string;
        channel: import("@prisma/client").$Enums.NotificationChannel;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
}
