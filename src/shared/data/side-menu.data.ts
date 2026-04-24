import { MenuGroup } from '../types/side-menu.types';

export const MENU_ITEMS: MenuGroup[] = [
  {
    groupLabel: '',
    items: [
      {
        label: 'Inicio',
        href: '/',
        icon: 'oui:nav-dashboards',
      },

      {
        label: 'Ventas',
        href: '/ventas',
        icon: 'icon-park-outline:sales-report',
      },

      {
        label: 'Clientes',
        href: '/clientes',
        icon: 'tabler:users-group',
      },

      {
        label: 'Operación',
        href: '/operacion',
        icon: 'lsicon:operation-outline',
      },

      {
        label: 'Equipo',
        href: '/equipo',
        icon: 'streamline-ultimate:team-meeting',
      },

      {
        label: 'Reportes',
        href: '/reportes',
        icon: 'fluent-mdl2:chart',
      },

      {
        label: 'Configuración',
        href: '/configuracion',
        icon: 'mynaui:config-vertical',
      },

      // {
      //   label: 'Estudiantes',
      //   href: '#',
      //   icon: 'GraduationCap',
      //   roles: ['admin', 'user'],
      //   items: [{ label: 'Buscar y filtrar estudiantes', href: '/administracion/estudiantes' }],
      // },
    ],
  },
];
