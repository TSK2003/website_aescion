import { NotificationsRepository } from './notifications.repository';
export declare class NotificationsService {
    private readonly notifRepo;
    constructor(notifRepo: NotificationsRepository);
    getUserNotifications(tenantId: string, userId: string): Promise<{
        id: string;
        tenantId: string;
        title: string;
        status: import("@prisma/client").$Enums.NotificationStatus;
        createdAt: Date;
        type: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        message: string;
        userId: string;
        channel: import("@prisma/client").$Enums.NotificationChannel;
        actionUrl: string | null;
        readAt: Date | null;
    }[]>;
    markAsRead(tenantId: string, id: string): Promise<{
        id: string;
        tenantId: string;
        title: string;
        status: import("@prisma/client").$Enums.NotificationStatus;
        createdAt: Date;
        type: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        message: string;
        userId: string;
        channel: import("@prisma/client").$Enums.NotificationChannel;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
}
