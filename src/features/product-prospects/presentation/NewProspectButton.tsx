'use client';

import React from 'react';
import { Icon } from '@iconify/react';

const NewProspectButton: React.FC = () => {
  return (
    <div className="group fixed bottom-0 right-0 z-50 m-4 flex items-center">
      <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-md transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        Nuevo prospecto
      </span>

      <button
        className="rounded-full bg-primary p-3 shadow-lg transition-all duration-200 hover:primary-color-400 hover:scale-105"
        onClick={() => (document.getElementById('create-prospect-modal') as HTMLDialogElement)?.showModal()}
      >
        <Icon icon="mdi:plus" className="text-2xl text-black" />
      </button>
    </div>
  );
};

export default NewProspectButton;
