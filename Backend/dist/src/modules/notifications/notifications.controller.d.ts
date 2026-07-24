import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notifService;
    constructor(notifService: NotificationsService);
    getMyNotifications(user: any): Promise<{
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
    markAsRead(id: string, user: any): Promise<{
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
