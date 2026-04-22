import { CardOption } from '@/shared/components/form-components/CardSelector';

export const SIGNUP_ROLE_OPTIONS: CardOption[] = [
  {
    value: 'designer',
    title: 'Diseñador',
    icon: 'material-symbols:palette',
    description: 'Crea interfaces (UI) y todo tipo de activos visuales o gráficos para los diferentes canales.',
  },
  {
    value: 'content-creator',
    title: 'Copywriter',
    icon: 'f7:doc-text-fill',
    description: 'Redacta copy, artículos y parrillas de redes. Da soporte de contenido en desarrollos y sitios de WordPress.',
  },
  {
    value: 'seo',
    title: 'Especialista en SEO',
    icon: 'mdi:web',
    description: 'Optimiza la arquitectura web y autoridad del dominio. Realiza keyword research y analiza métricas orgánicas.',
  },
  {
    value: 'marketing',
    title: 'Especialista en marketing digital',
    icon: 'bxs:megaphone',
    description: 'Diseña y ejecuta estrategias de pauta publicitaria (Ads) enfocadas en conversión dentro de redes sociales.',
  },
  {
    value: 'developer',
    title: 'Desarrollador',
    icon: 'fluent:code-circle-32-filled',
    description: 'Construye la infraestructura web: sitios en WordPress, integraciones a medida, landing pages y configuración de servidores.',
  },
  {
    value: 'digital-operator',
    title: 'Operador digital',
    icon: 'simple-icons:googlemaps',
    description: 'Opera plataformas de terceros (Yext, Google Business). Configura el onboarding y sincroniza la huella digital local.',
  },
  {
    value: 'sales-representative',
    title: 'Implementador de ventas',
    icon: 'bxs:rocket',
    description: 'Enlace entre venta y operación. Configura el entorno comercial, gestiona activos y arranca los servicios.',
  },
  {
    value: 'salesperson',
    title: 'Vendedor',
    icon: 'fa7-solid:handshake',
    description: 'Prospecta y atrae nuevos clientes. Mantiene un enfoque 100% transaccional y de relaciones comerciales.',
  },
  {
    value: 'pm',
    title: 'Project Manager',
    icon: 'bi:kanban-fill',
    description: 'Asigna tareas, resuelve bloqueos técnicos y asegura la entrega a tiempo y rentabilidad de los proyectos.',
  },
  {
    value: 'manager',
    title: 'Gerente',
    icon: 'vaadin:chart',
    description: 'Líder estratégico. Toma decisiones clave basándose en el rendimiento global, rentabilidad y eficiencia del equipo.',
  },
];
