'use client';

import { useSidebarStore } from '@/shared/stores/sidebar.store';
import { Icon } from '@iconify/react';

export default function MobileMenuButton() {
  const { open } = useSidebarStore();

  return (
    <button onClick={open} className="btn btn-circle btn-ghost text-slate-500 lg:hidden" aria-label="Abrir menú">
      <Icon icon="lucide:menu" className="text-2xl" />
    </button>
  );
}
