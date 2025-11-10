/**
 * Individual Task API Routes
 * Handles GET, PUT, DELETE for specific tasks
 */

import { NextRequest, NextResponse } from 'next/server';
import { TaskRepository } from '@/data/repositories/TaskRepository';
import { UpdateTaskUseCase } from '@/domain/usecases/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '@/domain/usecases/DeleteTaskUseCase';
import { TaskMapper } from '@/application/mappers/TaskMapper';
import { UpdateTaskDTO } from '@/application/dto/TaskDTO';
import { DomainError } from '@/domain/errors/DomainError';

const taskRepository = new TaskRepository();
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

// GET /api/tasks/[id] - Get a specific task
export async function GET(
  request: NextRequest,
  { params }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const taskId = parseInt(params.id);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const task = await taskRepository.getById(taskId);

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    if (task.userId !== parseInt(userId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Use Mapper to convert Domain Entity to Response DTO
    return NextResponse.json(TaskMapper.toResponseDTO(task));
  } catch (error: any) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/tasks/[id] - Update a task
export async function PUT(
  request: NextRequest,
  { params }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const taskId = parseInt(params.id);
    const body: UpdateTaskDTO = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIdNum = parseInt(userId);
    const task = await updateTaskUseCase.execute(taskId, userIdNum, {
      title: body.title,
      description: body.description,
      status: body.status,
    });

    // Use Mapper to convert Domain Entity to Response DTO
    return NextResponse.json(TaskMapper.toResponseDTO(task));
  } catch (error: any) {
    console.error('Error updating task:', error);
    if (error instanceof DomainError) {
      if (error.code === 'NOT_FOUND') {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.code === 'FORBIDDEN') {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
  request: NextRequest,
  { params }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const taskId = parseInt(params.id);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIdNum = parseInt(userId);
    await deleteTaskUseCase.execute(taskId, userIdNum);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting task:', error);
    if (error instanceof DomainError) {
      if (error.code === 'NOT_FOUND') {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.code === 'FORBIDDEN') {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
