import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskRepository } from '@/data/repositories/TaskRepository';
import { Task } from '@/domain/entities/Task';
import { prisma } from '@/infrastructure/database/prisma';

// Mock the entire prisma client
vi.mock('@/infrastructure/database/prisma', () => ({
  prisma: {
    task: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

const mockTaskData = {
  id: 1,
  userId: 1,
  projectId: null,
  title: 'Test Task',
  description: 'A task for testing',
  status: 'todo',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaTask = {
  ...mockTaskData,
  status: 'todo', // Prisma stores enum as string
};

describe('TaskRepository', () => {
  let repository: TaskRepository;

  beforeEach(() => {
    repository = new TaskRepository();
    vi.clearAllMocks();
  });

  it('should create a task', async () => {
    (prisma.task.create as vi.Mock).mockResolvedValue(mockPrismaTask);

    const task = await repository.create({
      userId: 1,
      title: 'Test Task',
      description: 'A task for testing',
    });

    expect(prisma.task.create).toHaveBeenCalledWith({
      data: {
        userId: 1,
        projectId: null,
        title: 'Test Task',
        description: 'A task for testing',
        status: 'todo',
      },
    });
    expect(task).toBeInstanceOf(Task);
    expect(task.title).toBe('Test Task');
  });

  it('should get a task by id', async () => {
    (prisma.task.findUnique as vi.Mock).mockResolvedValue(mockPrismaTask);

    const task = await repository.getById(1);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(task).toBeInstanceOf(Task);
    expect(task?.id).toBe(1);
  });

  it('should return null if task not found', async () => {
    (prisma.task.findUnique as vi.Mock).mockResolvedValue(null);

    const task = await repository.getById(99);

    expect(task).toBeNull();
  });

  it('should get tasks by user id', async () => {
    (prisma.task.findMany as vi.Mock).mockResolvedValue([mockPrismaTask]);

    const tasks = await repository.getByUserId(1);

    expect(prisma.task.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
      orderBy: { createdAt: 'desc' },
    });
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toBeInstanceOf(Task);
  });

  it('should update a task', async () => {
    const updatedPrismaTask = { ...mockPrismaTask, title: 'Updated Title' };
    (prisma.task.update as vi.Mock).mockResolvedValue(updatedPrismaTask);

    const task = await repository.update(1, { title: 'Updated Title' });

    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'Updated Title' },
    });
    expect(task.title).toBe('Updated Title');
  });

  it('should delete a task', async () => {
    (prisma.task.delete as vi.Mock).mockResolvedValue(mockPrismaTask);

    await repository.delete(1);

    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
