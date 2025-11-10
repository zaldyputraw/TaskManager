'use client';

import { useState } from 'react';
import { useApp } from '@/presentation/hooks/useApp';

export default function SignupForm() {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Signup failed');
      }

      window.location.href = '/login';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 card p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">{t('signup_title')}</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder={t('full_name')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input-field"
      />

      <input
        type="email"
        placeholder={t('email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="input-field"
      />

      <input
        type="password"
        placeholder={t('password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="input-field"
      />

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? t('signup_button') : t('signup_button')}
      </button>

      <p className="text-center">
        {t('already_have_account')} <a href="/login" className="text-indigo-600 hover:underline font-medium">{t('login_button')}</a>
      </p>
    </form>
  );
}
