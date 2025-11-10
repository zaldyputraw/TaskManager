/**
 * List Tasks By Project Use Case
 * Business logic for retrieving tasks in a specific project
 */

import { Task } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';
import { IProjectRepository } from '../repositories/IProjectRepository';
import { ForbiddenError } from '../errors/DomainError';

export class ListTasksByProjectUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private projectRepository: IProjectRepository
  ) {}

  async execute(projectId: number, userId: number): Promise<Task[]> {
    // Verify user owns the project
    const isOwner = await this.projectRepository.belongsToUser(projectId, userId);
    if (!isOwner) {
      throw new ForbiddenError('You do not have access to this project');
    }

    return await this.taskRepository.getByProjectId(projectId);
  }
}
