/**
 * Unit Tests for CreateTaskUseCase
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTaskUseCase } from '@/domain/usecases/CreateTaskUseCase';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { Task } from '@/domain/entities/Task';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let mockRepository: ITaskRepository;

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

    useCase = new CreateTaskUseCase(mockRepository);
  });

  it('should create a task with valid input', async () => {
    const mockTask = new Task({
      id: 1,
      userId: 1,
      projectId: null,
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    vi.mocked(mockRepository.create).mockResolvedValue(mockTask);

    const result = await useCase.execute({
      userId: 1,
      title: 'Test Task',
      description: 'Test Description',
    });

    expect(result.title).toBe('Test Task');
    expect(result.status).toBe('todo');
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it('should throw error for empty title', async () => {
    await expect(
      useCase.execute({
        userId: 1,
        title: '',
      })
    ).rejects.toThrow();
  });

  it('should default status to "todo" if not provided', async () => {
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

    vi.mocked(mockRepository.create).mockResolvedValue(mockTask);

    const result = await useCase.execute({
      userId: 1,
      title: 'Test Task',
    });

    expect(result.status).toBe('todo');
  });
});
