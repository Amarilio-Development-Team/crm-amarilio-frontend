'use client';

import { SWRConfig } from 'swr';
import { ApiError } from '@/shared/lib/authenticated-fetcher';

export default function DashboardSWRConfig({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        onError: error => {
          if (error instanceof ApiError && error.status === 401) {
            window.location.reload();
          }
        },
        shouldRetryOnError: error => {
          if (error instanceof ApiError && error.status === 401) return false;
          return true;
        },
        // revalidateOnFocus: process.env.NODE_ENV === 'development' ? false : true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
