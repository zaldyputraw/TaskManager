/**
 * Notifications API Routes
 * Handles notification CRUD operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { NotificationRepository } from '@/data/repositories/NotificationRepository';
import { CreateNotificationUseCase } from '@/domain/usecases/CreateNotificationUseCase';
import { ListNotificationsUseCase } from '@/domain/usecases/ListNotificationsUseCase';

const notificationRepository = new NotificationRepository();
const createNotificationUseCase = new CreateNotificationUseCase(notificationRepository);
const listNotificationsUseCase = new ListNotificationsUseCase(notificationRepository);

// GET /api/notifications - List all notifications
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await listNotificationsUseCase.execute(parseInt(userId));
    return NextResponse.json(notifications);
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/notifications - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notification = await createNotificationUseCase.execute({
      userId: parseInt(userId),
      type: body.type,
      title: body.title,
      message: body.message,
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error: any) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
