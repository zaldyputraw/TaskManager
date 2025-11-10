/**
 * Task Repository Implementation
 * Implements ITaskRepository interface using Prisma ORM
 * Part of the Data Layer
 */

import { Task, TaskStatus } from '@/domain/entities/Task';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { prisma } from '@/infrastructure/database/prisma';

export class TaskRepository implements ITaskRepository {
  async create(data: {
    userId: number;
    projectId?: number | null;
    title: string;
    description?: string | null;
    status?: TaskStatus;
  }): Promise<Task> {
    const prismaTask = await prisma.task.create({
      data: {
        userId: data.userId,
        projectId: data.projectId || null,
        title: data.title,
        description: data.description || null,
        status: data.status || 'todo',
      },
    });

    return this.mapToDomain(prismaTask);
  }

  async getById(id: number): Promise<Task | null> {
    const prismaTask = await prisma.task.findUnique({
      where: { id },
    });

    return prismaTask ? this.mapToDomain(prismaTask) : null;
  }

  async getByUserId(userId: number): Promise<Task[]> {
    const prismaTasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return prismaTasks.map((task) => this.mapToDomain(task));
  }

  async getByProjectId(projectId: number): Promise<Task[]> {
    const prismaTasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });

    return prismaTasks.map((task) => this.mapToDomain(task));
  }

  async getByUserIdAndStatus(userId: number, status: TaskStatus): Promise<Task[]> {
    const prismaTasks = await prisma.task.findMany({
      where: { userId, status },
      orderBy: { createdAt: 'desc' },
    });

    return prismaTasks.map((task) => this.mapToDomain(task));
  }

  async update(
    id: number,
    data: {
      title?: string;
      description?: string | null;
      status?: TaskStatus;
    }
  ): Promise<Task> {
    const prismaTask = await prisma.task.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });

    return this.mapToDomain(prismaTask);
  }

  async delete(id: number): Promise<void> {
    await prisma.task.delete({
      where: { id },
    });
  }

  async belongsToUser(taskId: number, userId: number): Promise<boolean> {
    const task = await this.getById(taskId);
    return task ? task.userId === userId : false;
  }

  private mapToDomain(prismaTask: any): Task {
    return new Task({
      id: prismaTask.id,
      userId: prismaTask.userId,
      projectId: prismaTask.projectId,
      title: prismaTask.title,
      description: prismaTask.description,
      status: prismaTask.status as TaskStatus,
      createdAt: prismaTask.createdAt,
      updatedAt: prismaTask.updatedAt,
    });
  }
}
