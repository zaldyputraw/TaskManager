/**
 * List Tasks Use Case
 * Business logic for retrieving user's tasks
 */

import { Task } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class ListTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: number): Promise<Task[]> {
    return await this.taskRepository.getByUserId(userId);
  }
}
