/**
 * Create Task Use Case
 * Business logic for creating a new task
 */

import { Task, TaskStatus } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';
import { ValidationError } from '../errors/DomainError';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(input: {
    userId: number;
    title: string;
    description?: string;
    projectId?: number;
    status?: TaskStatus;
  }): Promise<Task> {
    // Validate input
    Task.validateTitle(input.title);

    if (input.status) {
      Task.validateStatus(input.status);
    }

    // Create task
    const task = await this.taskRepository.create({
      userId: input.userId,
      title: input.title,
      description: input.description || null,
      projectId: input.projectId || null,
      status: input.status || 'todo',
    });

    return task;
  }
}
