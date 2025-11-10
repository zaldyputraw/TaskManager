/**
 * Filter Tasks By Status Use Case
 * Business logic for retrieving tasks filtered by status
 */

import { Task, TaskStatus } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';
import { ValidationError } from '../errors/DomainError';

export class FilterTasksByStatusUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: number, status: TaskStatus): Promise<Task[]> {
    // Validate status
    Task.validateStatus(status);

    return await this.taskRepository.getByUserIdAndStatus(userId, status);
  }
}
