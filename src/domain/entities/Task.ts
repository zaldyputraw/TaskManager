/**
 * Task Entity
 * Represents a task in the system
 * Part of the Domain Layer - independent of frameworks
 */

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface ITask {
  id: number;
  userId: number;
  projectId: number | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Task implements ITask {
  id: number;
  userId: number;
  projectId: number | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: ITask) {
    this.id = data.id;
    this.userId = data.userId;
    this.projectId = data.projectId;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  isTodo(): boolean {
    return this.status === 'todo';
  }

  isInProgress(): boolean {
    return this.status === 'in_progress';
  }

  isDone(): boolean {
    return this.status === 'done';
  }

  static validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Task title cannot be empty');
    }
    if (title.length > 255) {
      throw new Error('Task title cannot exceed 255 characters');
    }
  }

  static validateStatus(status: string): void {
    const validStatuses: TaskStatus[] = ['todo', 'in_progress', 'done'];
    if (!validStatuses.includes(status as TaskStatus)) {
      throw new Error(`Invalid task status: ${status}`);
    }
  }
}
