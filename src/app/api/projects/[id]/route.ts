/**
 * Individual Project API Routes
 * Handles GET, PUT, DELETE for specific projects
 */

import { NextRequest, NextResponse } from 'next/server';
import { ProjectRepository } from '@/data/repositories/ProjectRepository';
import { UpdateProjectUseCase } from '@/domain/usecases/UpdateProjectUseCase';
import { DeleteProjectUseCase } from '@/domain/usecases/DeleteProjectUseCase';

const projectRepository = new ProjectRepository();
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);

// GET /api/projects/[id] - Get a specific project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const projectId = parseInt(params.id);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await projectRepository.getById(projectId);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project.userId !== parseInt(userId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const projectId = parseInt(params.id);
    const body = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await updateProjectUseCase.execute(projectId, parseInt(userId), {
      name: body.name,
      description: body.description,
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Error updating project:', error);
    if (error.code === 'NOT_FOUND') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error.code === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id');
    const projectId = parseInt(params.id);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await deleteProjectUseCase.execute(projectId, parseInt(userId));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    if (error.code === 'NOT_FOUND') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error.code === 'FORBIDDEN') {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
