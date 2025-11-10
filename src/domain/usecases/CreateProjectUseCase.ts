/**
 * Create Project Use Case
 * Business logic for creating a new project
 */

import { Project } from '../entities/Project';
import { IProjectRepository } from '../repositories/IProjectRepository';

export class CreateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(input: {
    userId: number;
    name: string;
    description?: string;
  }): Promise<Project> {
    Project.validateName(input.name);

    const project = await this.projectRepository.create({
      userId: input.userId,
      name: input.name,
      description: input.description || null,
    });

    return project;
  }
}
