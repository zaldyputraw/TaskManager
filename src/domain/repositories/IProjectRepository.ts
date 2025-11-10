/**
 * Project Repository Interface
 * Defines the contract for project data operations
 * Implements Dependency Inversion Principle
 */

import { Project } from '../entities/Project';

export interface IProjectRepository {
  create(data: {
    userId: number;
    name: string;
    description?: string | null;
  }): Promise<Project>;

  getById(id: number): Promise<Project | null>;

  getByUserId(userId: number): Promise<Project[]>;

  update(
    id: number,
    data: {
      name?: string;
      description?: string | null;
    }
  ): Promise<Project>;

  delete(id: number): Promise<void>;

  belongsToUser(projectId: number, userId: number): Promise<boolean>;
}
