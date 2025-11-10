/**
 * Task Repository Interface
 * Defines the contract for task data operations
 * Implements Dependency Inversion Principle
 */

import { Task, TaskStatus } from '../entities/Task';

export interface ITaskRepository {
  create(data: {
    userId: number;
    projectId?: number | null;
    title: string;
    description?: string | null;
    status?: TaskStatus;
  }): Promise<Task>;

  getById(id: number): Promise<Task | null>;

  getByUserId(userId: number): Promise<Task[]>;

  getByProjectId(projectId: number): Promise<Task[]>;

  getByUserIdAndStatus(userId: number, status: TaskStatus): Promise<Task[]>;

  update(
    id: number,
    data: {
      title?: string;
      description?: string | null;
      status?: TaskStatus;
    }
  ): Promise<Task>;

  delete(id: number): Promise<void>;

  belongsToUser(taskId: number, userId: number): Promise<boolean>;
}
