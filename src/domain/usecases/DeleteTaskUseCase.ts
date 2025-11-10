/**
 * Delete Task Use Case
 * Business logic for deleting a task
 */

import { ITaskRepository } from '../repositories/ITaskRepository';
import { NotFoundError, ForbiddenError } from '../errors/DomainError';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: number, userId: number): Promise<void> {
    // Verify task exists and belongs to user
    const task = await this.taskRepository.getById(taskId);
    if (!task) {
      throw new NotFoundError('Task', taskId);
    }

    if (task.userId !== userId) {
      throw new ForbiddenError('You do not have permission to delete this task');
    }

    // Delete task
    await this.taskRepository.delete(taskId);
  }
}
