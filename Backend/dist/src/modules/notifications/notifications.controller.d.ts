import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notifService;
    constructor(notifService: NotificationsService);
    getMyNotifications(user: any): Promise<{
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
    markAsRead(id: string, user: any): Promise<{
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
