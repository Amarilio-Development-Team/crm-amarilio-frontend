'use client';

import { logoutAction } from '../../application/auth.actions';
import { useState } from 'react';
import { sileo } from 'sileo';

interface LogoutButtonProps {
  children: (isPending: boolean) => React.ReactNode;
  className?: string;
}

export default function LogoutButton({ children, className }: LogoutButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    try {
      setIsPending(true);
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));

      const promisesExecution = Promise.all([logoutAction(), minLoadTime]).then(([serverResult]) => {
        if (!serverResult.success) {
          throw new Error(serverResult.error || 'Error al cerrar sesión');
        }
        return serverResult;
      });

      sileo.promise(promisesExecution, {
        loading: { title: 'Cerrando sesión...' },
        success: () => {
          return { title: '¡Nos vemos pronto!' };
        },
        error: err => {
          const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
          return { title: 'Error', description: <span className="font-medium! text-red-300">{errorMessage}</span> };
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isPending} className={className}>
      {children(isPending)}
    </button>
  );
}
