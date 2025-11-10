'use client';

import { useEffect, useState, useMemo } from 'react';
import TaskCard from '@/presentation/components/TaskCard';
import TaskForm from '@/presentation/components/TaskForm';
import { useApp } from '@/presentation/hooks/useApp';
import { TaskStatus } from '@/domain/entities/Task';

const STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];

// Component for a single Kanban column
const KanbanColumn = ({ status, tasks, onEdit, onDelete, t }: {
  status: TaskStatus;
  tasks: any[];
  onEdit: (task: any) => void;
  onDelete: (id: number) => void;
  t: (key: string) => string;
}) => {
  const titleKey = `board_${status.replace('_', '')}`;
  const statusColor = status === 'todo' ? 'bg-yellow-500' : status === 'in_progress' ? 'bg-blue-500' : 'bg-green-500';

  return (
    <div className="flex-1 min-w-[300px] max-w-[400px] bg-gray-100 rounded-lg shadow-md p-4 flex flex-col">
      <h2 className={`text-xl font-semibold text-white p-2 rounded-t-lg ${statusColor} mb-4`}>
        {t(titleKey)} ({tasks.length})
      </h2>
      <div className="space-y-4 overflow-y-auto flex-grow">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center p-4">{t('no_tasks_found')}</p>
        )}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { t, user } = useApp();
  const [tasks, setTasks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const userId = user?.userId;
      if (!userId) return;

      const response = await fetch('/api/tasks', {
        headers: { 'x-user-id': userId },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleSubmit = async (data: any) => {
    try {
      const userId = user?.userId;
      if (!userId) return;

      const url = editingTask ? `/api/tasks/${editingTask.id}` : '/api/tasks';
      const method = editingTask ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingTask(null);
        fetchTasks();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const userId = user?.userId;
      if (!userId) return;

      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': userId },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const tasksByStatus = useMemo(() => {
    return STATUSES.reduce((acc, status) => {
      acc[status] = tasks.filter(task => task.status === status);
      return acc;
    }, {} as Record<TaskStatus, any[]>);
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 p-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-extrabold text-gray-800">{t('app_title')}</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
            >
              {showForm ? t('cancel') : t('new_task')}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              className="text-sm text-gray-600 hover:text-red-500 transition duration-150"
            >
              {t('logout')}
            </button>
          </div>
        </header>

        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{editingTask ? t('edit_task') : t('new_task')}</h2>
            <TaskForm onSubmit={handleSubmit} initialData={editingTask} onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }} />
          </div>
        )}

        {loading ? (
          <p className="text-center text-xl text-gray-600 mt-10">Loading tasks...</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
            {STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                tasks={tasksByStatus[status]}
                onEdit={(t) => {
                  setEditingTask(t);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
                t={t}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
