/**
 * Update Task Use Case
 * Business logic for updating a task
 */

import { Task, TaskStatus } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';
import { NotFoundError, ForbiddenError } from '../errors/DomainError';

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    taskId: number,
    userId: number,
    input: {
      title?: string;
      description?: string | null;
      status?: TaskStatus;
    }
  ): Promise<Task> {
    // Verify task exists and belongs to user
    const task = await this.taskRepository.getById(taskId);
    if (!task) {
      throw new NotFoundError('Task', taskId);
    }

    if (task.userId !== userId) {
      throw new ForbiddenError('You do not have permission to update this task');
    }

    // Validate input
    if (input.title !== undefined) {
      Task.validateTitle(input.title);
    }

    if (input.status !== undefined) {
      Task.validateStatus(input.status);
    }

    // Update task
    const updatedTask = await this.taskRepository.update(taskId, {
      title: input.title,
      description: input.description,
      status: input.status,
    });

    return updatedTask;
  }
}
