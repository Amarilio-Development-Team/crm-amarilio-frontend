'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useSidebarStore } from '../stores/sidebar.store';
import AMARILIO_LOGO from '@/assets/amarilio.svg';
import LogoutButton from '@/features/auth/presentation/components/LogoutButton';
import { MENU_ITEMS } from '../data/side-menu.data';
import { MenuItem } from '../types/side-menu.types';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const SidebarItem = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();
  const closeMenu = useSidebarStore(state => state.close);
  const hasChildren = item.items && item.items.length > 0;
  const isChildActive = hasChildren ? item.items!.some(subItem => pathname === subItem.href) : false;

  if (hasChildren) {
    return (
      <li>
        <details open={isChildActive}>
          <summary className="hover:container-color-hover hover:border-accent-imarc group text-medium flex cursor-pointer items-center gap-3 rounded-none py-3 text-sm font-medium transition-colors hover:rounded-bl-lg hover:rounded-tl-lg hover:border-r-4">
            <span className="whitespace-nowrap">{item.label}</span>
          </summary>
          <ul className="mt-1 flex flex-col gap-y-1">
            {item.items!.map(subItem => {
              const isActive = pathname === subItem.href;
              return (
                <li key={subItem.href}>
                  <Link
                    href={subItem.href}
                    onClick={() => window.innerWidth < 1024 && closeMenu()}
                    className={`font-low block whitespace-nowrap rounded-none py-2 text-sm duration-200 ${isActive ? 'rounded-lg bg-gradient-to-br from-[#1D64D8] to-[#172E54] text-white shadow-md' : 'hover:container-color-hover hover:border-accent-imarc text-placeholder hover:rounded-bl-lg hover:rounded-tl-lg hover:border-r-[3px]'}`}
                  >
                    {subItem.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      </li>
    );
  }

  const isActive = pathname === item.href;
  return (
    <li>
      <Link
        href={item.href}
        onClick={() => window.innerWidth < 1024 && closeMenu()}
        className={`flex items-center gap-3 whitespace-nowrap rounded-none py-3 ${isActive ? 'container-color rounded-lg' : 'hover:container-color-hover text-medium hover:rounded-bl-lg hover:rounded-tl-lg hover:border-r-4 hover:border-primary'}`}
      >
        {item.icon && <Icon icon={item.icon} className="text-lg" />}
        <span className="whitespace-nowrap text-sm font-light">{item.label}</span>
      </Link>
    </li>
  );
};

interface SideMenuProps {
  userRole?: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ userRole }) => {
  const { isOpen, close, open } = useSidebarStore();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isNowMobile = width < 1024;
      setIsMobile(isNowMobile);
      if (!isNowMobile && !isOpen) open();
      if (isNowMobile && isOpen) close();
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const filteredMenu = MENU_ITEMS.map(group => {
    const processedItems = group.items.map(item => {
      const filteredChildren = item.items?.filter(subItem => {
        if (!subItem.roles || subItem.roles.length === 0) return true;
        return subItem.roles.includes(userRole || '');
      });
      return { ...item, items: filteredChildren };
    });
    const visibleItems = processedItems.filter(item => {
      const userHasAccessToParent = !item.roles || item.roles.length === 0 || item.roles.includes(userRole || '');
      if (!userHasAccessToParent) return false;
      if (item.items !== undefined && item.items.length === 0) return false;
      return true;
    });
    return { ...group, items: visibleItems };
  }).filter(group => group.items.length > 0);

  const sidebarVariants: Variants = {
    mobileClosed: {
      x: '-100%',
      width: '0px',
      padding: 0,
      transition: { type: 'spring', stiffness: 400, damping: 40 },
    },
    mobileOpen: {
      x: '0%',
      width: '280px',
      padding: 0,
      transition: { type: 'spring', stiffness: 400, damping: 40 },
    },
    desktopClosed: {
      x: '0%',
      minWidth: 0,
      width: 0,
      padding: 0,
      opacity: 0,
      transition: { type: 'spring', stiffness: 400, damping: 40 },
    },
    desktopOpen: {
      x: '0%',
      minWidth: '300px',
      width: '330px',
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  if (!isMounted) return null;

  const currentVariant = isMobile ? (isOpen ? 'mobileOpen' : 'mobileClosed') : isOpen ? 'desktopOpen' : 'desktopClosed';

  return (
    <>
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div initial="closed" animate="open" exit="closed" variants={overlayVariants} onClick={close} className="fixed inset-0 z-[999999] bg-black/50 backdrop-blur-[2px] lg:hidden" />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={currentVariant}
        variants={sidebarVariants}
        className="overflow-hidden', 'min-h-full main-container-color fixed inset-y-0 left-0 z-[9999999] lg:relative lg:shadow-none"
      >
        <div className="scrollbar-hide border-main flex h-full w-full min-w-[300px] flex-col overflow-y-auto border-r p-2">
          {/* Header */}
          <div className="mb-6 flex min-h-[65px] items-center justify-between px-6">
            <Image src={AMARILIO_LOGO} alt="Amarilio Logo" className="h-5 w-auto lg:h-6" />
            <button onClick={close} className="btn btn-circle btn-ghost btn-sm text-slate-400 hover:text-red-500 lg:hidden" aria-label="Cerrar menú"></button>
          </div>

          <ul className="menu flex-1 space-y-4">
            {filteredMenu.map((group, index) => (
              <React.Fragment key={index}>
                {group.groupLabel && <li className="whitespace-nowrap pb-2 pt-4 text-xs font-bold uppercase tracking-wider opacity-50">{group.groupLabel}</li>}
                {group.items.map(item => (
                  <SidebarItem key={item.label} item={item} />
                ))}
              </React.Fragment>
            ))}
          </ul>

          <div className="border-main mt-auto border-t px-6 pb-6 pt-6">
            <Link href="/ajustes" className="hover:container-color-hover text-medium flex items-center gap-3 whitespace-nowrap rounded-none py-3 transition-colors duration-200 hover:text-blue-600">
              <Icon icon="uil:setting" className="text-lg" />
              <span className="whitespace-nowrap text-sm font-light">Configuración</span>
            </Link>

            <Link href="/ajustes" className="hover:container-color-hover text-medium flex items-center gap-3 whitespace-nowrap rounded-none py-3 transition-colors duration-200 hover:text-emerald-600">
              <Icon icon="ix:support" className="text-lg" />
              <span className="whitespace-nowrap text-sm font-light">Ayuda y soporte</span>
            </Link>

            <LogoutButton className="w-full">
              {isPending => (
                <div
                  className={`text-medium flex w-full cursor-pointer items-center gap-3 whitespace-nowrap rounded-lg py-3 text-sm font-light transition-colors hover:text-red-500 ${isPending ? 'cursor-not-allowed bg-gray-100 text-gray-400' : ''}`}
                >
                  <Icon icon="material-symbols:logout" className="text-lg" />
                  {isPending ? 'Cerrando...' : 'Cerrar Sesión'}
                </div>
              )}
            </LogoutButton>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default SideMenu;
