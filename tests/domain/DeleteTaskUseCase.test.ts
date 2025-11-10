/**
 * Unit Tests for DeleteTaskUseCase
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteTaskUseCase } from '@/domain/usecases/DeleteTaskUseCase';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { Task } from '@/domain/entities/Task';
import { NotFoundError, ForbiddenError } from '@/domain/errors/DomainError';

describe('DeleteTaskUseCase', () => {
  let useCase: DeleteTaskUseCase;
  let mockRepository: ITaskRepository;

  const mockTask = new Task({
    id: 1,
    userId: 1,
    projectId: null,
    title: 'Test Task',
    description: null,
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

    useCase = new DeleteTaskUseCase(mockRepository);
  });

  it('should delete a task successfully', async () => {
    vi.mocked(mockRepository.getById).mockResolvedValue(mockTask);
    vi.mocked(mockRepository.delete).mockResolvedValue(undefined);

    await useCase.execute(1, 1);

    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundError if task does not exist', async () => {
    vi.mocked(mockRepository.getById).mockResolvedValue(null);

    await expect(useCase.execute(999, 1)).rejects.toThrow(NotFoundError);
  });

  it('should throw ForbiddenError if task does not belong to user', async () => {
    vi.mocked(mockRepository.getById).mockResolvedValue(mockTask);

    await expect(useCase.execute(1, 999)).rejects.toThrow(ForbiddenError);
  });
});
