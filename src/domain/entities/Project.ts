/**
 * Project Entity
 * Represents a project that contains multiple tasks
 * Part of the Domain Layer - independent of frameworks
 */

export interface IProject {
  id: number;
  userId: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Project implements IProject {
  id: number;
  userId: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IProject) {
    this.id = data.id;
    this.userId = data.userId;
    this.name = data.name;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Project name cannot be empty');
    }
    if (name.length > 255) {
      throw new Error('Project name cannot exceed 255 characters');
    }
  }
}
