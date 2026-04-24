'use client';

import LogoutButton from '../../../features/auth/presentation/components/LogoutButton';
import React from 'react';

const NavbarLogoutButton: React.FC = () => {
  return (
    <LogoutButton>
      {isPending => (
        <div className={`flex w-full cursor-pointer text-sm font-medium transition-colors ${isPending ? 'cursor-not-allowed' : 'text-red-500'}`}>
          {isPending ? 'Cerrando sesión...' : 'Cerrar Sesión'}
        </div>
      )}
    </LogoutButton>
  );
};

export default NavbarLogoutButton;
