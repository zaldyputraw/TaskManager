'use client';

import { ReactNode } from 'react';
import '@/infrastructure/config/i18n'; // Initialize i18n

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
