/**
 * Notification Repository Interface
 * Defines the contract for notification data operations
 */

import { Notification, NotificationType } from '../entities/Notification';

export interface INotificationRepository {
  create(data: {
    userId: number;
    type: NotificationType;
    title: string;
    message: string;
  }): Promise<Notification>;

  getById(id: number): Promise<Notification | null>;

  getByUserId(userId: number): Promise<Notification[]>;

  getUnreadByUserId(userId: number): Promise<Notification[]>;

  markAsRead(id: number): Promise<Notification>;

  markAllAsRead(userId: number): Promise<void>;

  delete(id: number): Promise<void>;
}
