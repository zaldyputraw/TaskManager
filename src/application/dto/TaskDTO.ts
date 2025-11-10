import { TaskStatus } from '@/domain/entities/Task';

// DTO for incoming data (Request)
export interface CreateTaskDTO {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  projectId?: number | null;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
}

// DTO for outgoing data (Response)
export interface TaskResponseDTO {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  projectId: number | null;
  createdAt: string;
  updatedAt: string;
}
