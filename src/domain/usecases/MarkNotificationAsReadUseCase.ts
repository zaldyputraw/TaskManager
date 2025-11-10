/**
 * Mark Notification As Read Use Case
 * Business logic for marking a notification as read
 */

import { Notification } from '../entities/Notification';
import { INotificationRepository } from '../repositories/INotificationRepository';

export class MarkNotificationAsReadUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(notificationId: number): Promise<Notification> {
    return await this.notificationRepository.markAsRead(notificationId);
  }
}
