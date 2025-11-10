/**
 * Update Project Use Case
 * Business logic for updating a project
 */

import { Project } from '../entities/Project';
import { IProjectRepository } from '../repositories/IProjectRepository';
import { NotFoundError, ForbiddenError } from '../errors/DomainError';

export class UpdateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(
    projectId: number,
    userId: number,
    input: {
      name?: string;
      description?: string;
    }
  ): Promise<Project> {
    const project = await this.projectRepository.getById(projectId);
    if (!project) {
      throw new NotFoundError('Project', projectId);
    }

    if (project.userId !== userId) {
      throw new ForbiddenError('You do not have permission to update this project');
    }

    if (input.name !== undefined) {
      Project.validateName(input.name);
    }

    const updatedProject = await this.projectRepository.update(projectId, {
      name: input.name,
      description: input.description,
    });

    return updatedProject;
  }
}
