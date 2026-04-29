import type { Variants } from 'framer-motion';

export const sidebarVariants: Variants = {
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
    minWidth: '80px',
    width: '80px',
    padding: 0,
    opacity: 1,
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
