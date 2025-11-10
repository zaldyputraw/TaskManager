/**
 * Notification Entity
 * Represents a notification in the system
 */

export type NotificationType = 'task_created' | 'task_updated' | 'task_deleted' | 'project_created' | 'project_updated';

export interface INotification {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Notification implements INotification {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: INotification) {
    this.id = data.id;
    this.userId = data.userId;
    this.type = data.type;
    this.title = data.title;
    this.message = data.message;
    this.read = data.read;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Notification title cannot be empty');
    }
  }

  static validateMessage(message: string): void {
    if (!message || message.trim().length === 0) {
      throw new Error('Notification message cannot be empty');
    }
  }
}
