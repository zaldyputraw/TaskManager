/**
 * Task API Routes
 * Handles task CRUD operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { TaskRepository } from '@/data/repositories/TaskRepository';
import { CreateTaskUseCase } from '@/domain/usecases/CreateTaskUseCase';
import { ListTasksUseCase } from '@/domain/usecases/ListTasksUseCase';
import { FilterTasksByStatusUseCase } from '@/domain/usecases/FilterTasksByStatusUseCase';
import { TaskMapper } from '@/application/mappers/TaskMapper';
import { CreateTaskDTO } from '@/application/dto/TaskDTO';

const taskRepository = new TaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const listTasksUseCase = new ListTasksUseCase(taskRepository);
const filterTasksByStatusUseCase = new FilterTasksByStatusUseCase(taskRepository);

// GET /api/tasks - List all tasks or filter by status
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const status = request.nextUrl.searchParams.get('status');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIdNum = parseInt(userId);
    let tasks;

    if (status) {
      tasks = await filterTasksByStatusUseCase.execute(userIdNum, status as any);
    } else {
      tasks = await listTasksUseCase.execute(userIdNum);
    }
    
    // Use Mapper to convert Domain Entity to Response DTO
    return NextResponse.json(TaskMapper.toResponseDTOList(tasks));
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body: CreateTaskDTO = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIdNum = parseInt(userId);
    
    // Pass DTO data to Use Case
    const task = await createTaskUseCase.execute({
      userId: userIdNum,
      title: body.title,
      description: body.description,
      projectId: body.projectId,
      status: body.status,
    });

    // Use Mapper to convert Domain Entity to Response DTO
    return NextResponse.json(TaskMapper.toResponseDTO(task), { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
