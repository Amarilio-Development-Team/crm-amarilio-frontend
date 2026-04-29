'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebarStore } from '../../stores/sidebar.store';
import AMARILIO_LOGO from '@/assets/amarilio.svg';
import LogoutButton from '@/features/auth/presentation/components/LogoutButton';
import { MENU_ITEMS } from '../../data/side-menu.data';
import { MenuItem } from '../../types/side-menu.types';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { sidebarVariants } from './framer-variants';

const SidebarItem = ({ item, isCollapsed }: { item: MenuItem; isCollapsed: boolean }) => {
  const pathname = usePathname();
  const { close: closeMenu, open: openMenu } = useSidebarStore();
  const hasChildren = item.items && item.items.length > 0;
  const isChildActive = hasChildren ? item.items!.some(subItem => pathname === subItem.href) : false;

  if (hasChildren) {
    return (
      <li>
        <details open={isChildActive && !isCollapsed}>
          <summary
            onClick={e => {
              if (isCollapsed) {
                e.preventDefault();
                openMenu();
              }
            }}
            className={`hover:container-color-hover hover:border-accent-imarc group text-medium flex cursor-pointer items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3'} rounded-none py-3 text-sm font-medium transition-all hover:rounded-bl-lg hover:rounded-tl-lg hover:border-r-4`}
          >
            {item.icon && <Icon icon={item.icon} className="shrink-0 text-xl" />}
            <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>{item.label}</span>

            {!isCollapsed && <Icon icon="lucide:chevron-down" className="ml-auto opacity-50" />}
          </summary>

          <ul className={`mt-1 flex flex-col gap-y-1 overflow-hidden transition-all duration-300 ${isCollapsed ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}>
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
        title={isCollapsed ? item.label : undefined}
        className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3'} whitespace-nowrap rounded-none py-3 transition-all ${isActive ? 'container-color rounded-lg' : 'hover:container-color-hover text-medium hover:rounded-bl-lg hover:rounded-tl-lg hover:border-r-4 hover:border-primary'}`}
      >
        {item.icon && <Icon icon={item.icon} className="shrink-0 text-xl" />}
        <span className={`whitespace-nowrap text-sm font-light transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>{item.label}</span>
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

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  if (!isMounted) return null;

  const currentVariant = isMobile ? (isOpen ? 'mobileOpen' : 'mobileClosed') : isOpen ? 'desktopOpen' : 'desktopClosed';

  const isCollapsed = !isMobile && !isOpen;

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
        className="main-container-color fixed inset-y-0 left-0 z-[9999999] min-h-full overflow-hidden lg:relative lg:shadow-none"
      >
        <div className="scrollbar-hide border-main flex h-full w-full flex-col overflow-y-auto overflow-x-hidden border-r p-2">
          <div className={`mb-6 flex min-h-[65px] items-center px-4 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex items-center overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              <Image src={AMARILIO_LOGO} alt="Amarilio Logo" className="h-5 w-auto lg:h-6" />
            </div>

            {/* desktop button (toggle) */}
            <button onClick={() => (isOpen ? close() : open())} className="hidden rounded-lg p-2 transition-colors hover:container-color dark:hover:bg-gray-800 lg:flex" aria-label="Alternar menú">
              <Icon icon={isOpen ? 'lucide:panel-left-close' : 'lucide:panel-left-open'} className="shrink-0 text-xl" />
            </button>

            {/* mobile button (close) */}
            <button onClick={close} className="btn btn-circle btn-ghost btn-sm hover:text-red-500 lg:hidden" aria-label="Cerrar menú">
              <Icon icon="lucide:x" className="text-xl" />
            </button>
          </div>

          <ul className="menu flex-1 space-y-2">
            {filteredMenu.map((group, index) => (
              <React.Fragment key={index}>
                {group.groupLabel && (
                  <li className={`whitespace-nowrap pb-2 pt-4 text-xs font-bold uppercase tracking-wider opacity-50 transition-all duration-300 ${isCollapsed ? 'text-center text-[10px]' : ''}`}>
                    {isCollapsed ? group.groupLabel.slice(0, 3) : group.groupLabel}
                  </li>
                )}
                {group.items.map(item => (
                  <SidebarItem key={item.label} item={item} isCollapsed={isCollapsed} />
                ))}
              </React.Fragment>
            ))}
          </ul>

          <div className="border-main mt-auto flex flex-col space-y-2 border-t px-4 pb-6 pt-6">
            <Link
              href="/ajustes"
              title={isCollapsed ? 'Configuración' : undefined}
              className={`hover:container-color-hover text-medium flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} whitespace-nowrap rounded-lg py-3 transition-colors duration-200 hover:text-blue-600`}
            >
              <Icon icon="uil:setting" className="shrink-0 text-xl" />
              <span className={`whitespace-nowrap text-sm font-light transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>Configuración</span>
            </Link>

            <Link
              href="/ajustes"
              title={isCollapsed ? 'Ayuda y soporte' : undefined}
              className={`hover:container-color-hover text-medium flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} whitespace-nowrap rounded-lg py-3 transition-colors duration-200 hover:text-emerald-600`}
            >
              <Icon icon="ix:support" className="shrink-0 text-xl" />
              <span className={`whitespace-nowrap text-sm font-light transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>Ayuda y soporte</span>
            </Link>

            <LogoutButton className="w-full">
              {isPending => (
                <div
                  title={isCollapsed ? 'Cerrar Sesión' : undefined}
                  className={`text-medium flex w-full cursor-pointer items-center ${isCollapsed ? 'justify-center' : 'gap-3'} whitespace-nowrap rounded-lg py-3 text-sm font-light transition-colors hover:text-red-500 ${isPending ? 'cursor-not-allowed bg-gray-100 text-gray-400' : ''}`}
                >
                  <Icon icon="material-symbols:logout" className="shrink-0 text-xl" />
                  <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}`}>
                    {isPending ? 'Cerrando...' : 'Cerrar Sesión'}
                  </span>
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
