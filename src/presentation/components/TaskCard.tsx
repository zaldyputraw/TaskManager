
'use client';
import { useApp } from '@/presentation/hooks/useApp';
import { getStatusTranslationKey } from '@/presentation/utils';

interface TaskCardProps {
  task: any;
  onEdit: (task: any) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { t } = useApp();
  const statusColors: Record<string, string> = {
    todo: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
  };

  return (
    <div className="card p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{task.title}</h3>
        <span className={`px-2 py-1 rounded text-sm font-semibold ${statusColors[task.status] || 'bg-gray-100'}`}>
          {t(getStatusTranslationKey(task.status))}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="btn-primary flex-1 px-3 py-1 text-sm"
        >
          {t('edit_task')}
        </button>
        <button
          onClick={() => {
            if (window.confirm(t('confirm_delete'))) {
              onDelete(task.id);
            }
          }}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 flex-1"
        >
          {t('delete_task')}
        </button>
      </div>
    </div>
  );
}
