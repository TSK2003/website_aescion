import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(private readonly notifRepo: NotificationsRepository) {}

  async getUserNotifications(tenantId: string, userId: string) {
    return this.notifRepo.getUserNotifications(tenantId, userId);
  }

  async markAsRead(tenantId: string, id: string) {
    return this.notifRepo.markAsRead(tenantId, id);
  }
}
