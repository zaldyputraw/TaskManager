/**
 * Unit Tests for UpdateTaskUseCase
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UpdateTaskUseCase } from '@/domain/usecases/UpdateTaskUseCase';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { Task } from '@/domain/entities/Task';
import { NotFoundError, ForbiddenError } from '@/domain/errors/DomainError';

describe('UpdateTaskUseCase', () => {
  let useCase: UpdateTaskUseCase;
  let mockRepository: ITaskRepository;

  const mockTask = new Task({
    id: 1,
    userId: 1,
    projectId: null,
    title: 'Original Task',
    description: 'Original Description',
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      getById: vi.fn(),
      getByUserId: vi.fn(),
      getByProjectId: vi.fn(),
      getByUserIdAndStatus: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      belongsToUser: vi.fn(),
    };

    useCase = new UpdateTaskUseCase(mockRepository);
  });

  it('should update a task with valid input', async () => {
    const updatedTask = new Task({
      ...mockTask,
      title: 'Updated Task',
      status: 'in_progress',
    });

    vi.mocked(mockRepository.getById).mockResolvedValue(mockTask);
    vi.mocked(mockRepository.update).mockResolvedValue(updatedTask);

    const result = await useCase.execute(1, 1, {
      title: 'Updated Task',
      status: 'in_progress',
    });

    expect(result.title).toBe('Updated Task');
    expect(result.status).toBe('in_progress');
  });

  it('should throw NotFoundError if task does not exist', async () => {
    vi.mocked(mockRepository.getById).mockResolvedValue(null);

    await expect(
      useCase.execute(999, 1, { title: 'Updated Task' })
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw ForbiddenError if task does not belong to user', async () => {
    vi.mocked(mockRepository.getById).mockResolvedValue(mockTask);

    await expect(
      useCase.execute(1, 999, { title: 'Updated Task' })
    ).rejects.toThrow(ForbiddenError);
  });
});
