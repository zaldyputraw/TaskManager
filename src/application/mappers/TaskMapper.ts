import { Task } from '@/domain/entities/Task';
import { TaskResponseDTO } from '../dto/TaskDTO';

export class TaskMapper {
  static toResponseDTO(task: Task): TaskResponseDTO {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      projectId: task.projectId,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  }

  static toResponseDTOList(tasks: Task[]): TaskResponseDTO[] {
    return tasks.map(TaskMapper.toResponseDTO);
  }
}
