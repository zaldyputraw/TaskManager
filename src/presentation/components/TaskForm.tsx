'use client';

import { useState } from 'react';
import { useApp } from '@/presentation/hooks/useApp';

interface TaskFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  loading?: boolean;
  onCancel: () => void;
}

export default function TaskForm({ onSubmit, initialData, loading = false, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || 'todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 card p-6">
      <input
        type="text"
        placeholder={t('task_title')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="input-field"
      />

      <textarea
        placeholder={t('description')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field h-24"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input-field"
      >
        <option value="todo">{t('status_todo')}</option>
        <option value="in_progress">{t('status_in_progress')}</option>
        <option value="done">{t('status_done')}</option>
      </select>

      <div className="flex space-x-4">
        <button
        type="submit"
        disabled={loading}
        className="btn-primary flex-1 disabled:opacity-50"
      >
        {loading ? t('save_task') : t('save_task')}
      </button>
      <button type="button" onClick={onCancel} className="btn-secondary flex-1">
        {t('cancel')}
      </button>
    </div>
    </form>
  );
}
