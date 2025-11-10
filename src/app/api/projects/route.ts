/**
 * Projects API Routes
 * Handles project CRUD operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { ProjectRepository } from '@/data/repositories/ProjectRepository';
import { CreateProjectUseCase } from '@/domain/usecases/CreateProjectUseCase';
import { ListProjectsUseCase } from '@/domain/usecases/ListProjectsUseCase';

const projectRepository = new ProjectRepository();
const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const listProjectsUseCase = new ListProjectsUseCase(projectRepository);

// GET /api/projects - List all projects
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await listProjectsUseCase.execute(parseInt(userId));
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const body = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await createProjectUseCase.execute({
      userId: parseInt(userId),
      name: body.name,
      description: body.description,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
