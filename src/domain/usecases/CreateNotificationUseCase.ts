/**
 * Create Notification Use Case
 * Business logic for creating a notification
 */

import { Notification, NotificationType } from '../entities/Notification';
import { INotificationRepository } from '../repositories/INotificationRepository';

export class CreateNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(input: {
    userId: number;
    type: NotificationType;
    title: string;
    message: string;
  }): Promise<Notification> {
    Notification.validateTitle(input.title);
    Notification.validateMessage(input.message);

    const notification = await this.notificationRepository.create({
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
    });

    return notification;
  }
}
