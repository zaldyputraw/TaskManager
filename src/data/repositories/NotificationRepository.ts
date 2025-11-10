/**
 * Notification Repository Implementation
 * Implements INotificationRepository using Prisma ORM
 */

import { Notification, NotificationType } from '@/domain/entities/Notification';
import { INotificationRepository } from '@/domain/repositories/INotificationRepository';
import { prisma } from '@/infrastructure/database/prisma';

export class NotificationRepository implements INotificationRepository {
  async create(data: {
    userId: number;
    type: NotificationType;
    title: string;
    message: string;
  }): Promise<Notification> {
    const prismaNotification = await prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        read: false,
      },
    });

    return this.mapToDomain(prismaNotification);
  }

  async getById(id: number): Promise<Notification | null> {
    const prismaNotification = await prisma.notification.findUnique({
      where: { id },
    });

    return prismaNotification ? this.mapToDomain(prismaNotification) : null;
  }

  async getByUserId(userId: number): Promise<Notification[]> {
    const prismaNotifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return prismaNotifications.map((notification) => this.mapToDomain(notification));
  }

  async getUnreadByUserId(userId: number): Promise<Notification[]> {
    const prismaNotifications = await prisma.notification.findMany({
      where: { userId, read: false },
      orderBy: { createdAt: 'desc' },
    });

    return prismaNotifications.map((notification) => this.mapToDomain(notification));
  }

  async markAsRead(id: number): Promise<Notification> {
    const prismaNotification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    return this.mapToDomain(prismaNotification);
  }

  async markAllAsRead(userId: number): Promise<void> {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.notification.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaNotification: any): Notification {
    return new Notification({
      id: prismaNotification.id,
      userId: prismaNotification.userId,
      type: prismaNotification.type,
      title: prismaNotification.title,
      message: prismaNotification.message,
      read: prismaNotification.read,
      createdAt: prismaNotification.createdAt,
      updatedAt: prismaNotification.updatedAt,
    });
  }
}
