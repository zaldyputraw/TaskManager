/**
 * Delete Project Use Case
 * Business logic for deleting a project
 */

import { IProjectRepository } from '../repositories/IProjectRepository';
import { NotFoundError, ForbiddenError } from '../errors/DomainError';

export class DeleteProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(projectId: number, userId: number): Promise<void> {
    const project = await this.projectRepository.getById(projectId);
    if (!project) {
      throw new NotFoundError('Project', projectId);
    }

    if (project.userId !== userId) {
      throw new ForbiddenError('You do not have permission to delete this project');
    }

    await this.projectRepository.delete(projectId);
  }
}
