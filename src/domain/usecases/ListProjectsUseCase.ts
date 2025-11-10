/**
 * List Projects Use Case
 * Business logic for retrieving user's projects
 */

import { Project } from '../entities/Project';
import { IProjectRepository } from '../repositories/IProjectRepository';

export class ListProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(userId: number): Promise<Project[]> {
    return await this.projectRepository.getByUserId(userId);
  }
}
