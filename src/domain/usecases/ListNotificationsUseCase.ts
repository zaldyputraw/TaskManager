/**
 * List Notifications Use Case
 * Business logic for retrieving user's notifications
 */

import { Notification } from '../entities/Notification';
import { INotificationRepository } from '../repositories/INotificationRepository';

export class ListNotificationsUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(userId: number): Promise<Notification[]> {
    return await this.notificationRepository.getByUserId(userId);
  }
}
