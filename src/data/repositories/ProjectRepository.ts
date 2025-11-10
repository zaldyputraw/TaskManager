/**
 * Project Repository Implementation
 * Implements IProjectRepository interface using Prisma ORM
 * Part of the Data Layer
 */

import { Project } from '@/domain/entities/Project';
import { IProjectRepository } from '@/domain/repositories/IProjectRepository';
import { prisma } from '@/infrastructure/database/prisma';

export class ProjectRepository implements IProjectRepository {
  async create(data: {
    userId: number;
    name: string;
    description?: string | null;
  }): Promise<Project> {
    const prismaProject = await prisma.project.create({
      data: {
        userId: data.userId,
        name: data.name,
        description: data.description || null,
      },
    });

    return this.mapToDomain(prismaProject);
  }

  async getById(id: number): Promise<Project | null> {
    const prismaProject = await prisma.project.findUnique({
      where: { id },
    });

    return prismaProject ? this.mapToDomain(prismaProject) : null;
  }

  async getByUserId(userId: number): Promise<Project[]> {
    const prismaProjects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return prismaProjects.map((project) => this.mapToDomain(project));
  }

  async update(
    id: number,
    data: {
      name?: string;
      description?: string | null;
    }
  ): Promise<Project> {
    const prismaProject = await prisma.project.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
      },
    });

    return this.mapToDomain(prismaProject);
  }

  async delete(id: number): Promise<void> {
    await prisma.project.delete({
      where: { id },
    });
  }

  async belongsToUser(projectId: number, userId: number): Promise<boolean> {
    const project = await this.getById(projectId);
    return project ? project.userId === userId : false;
  }

  private mapToDomain(prismaProject: any): Project {
    return new Project({
      id: prismaProject.id,
      userId: prismaProject.userId,
      name: prismaProject.name,
      description: prismaProject.description,
      createdAt: prismaProject.createdAt,
      updatedAt: prismaProject.updatedAt,
    });
  }
}
