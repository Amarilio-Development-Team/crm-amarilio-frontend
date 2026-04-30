export interface ClientCardOption {
  value: string;
  title: string;
  description: string;
  icon: string;
}

export const clientOptions: ClientCardOption[] = [
  {
    value: 'cliente_nuevo',
    title: 'Cliente nuevo',
    description: 'Registrar un prospecto para un nuevo cliente desde cero.',
    icon: 'mdi:account-plus-outline',
  },
  {
    value: 'cliente_amarilio',
    title: 'Cliente Amarilio',
    description: 'Seleccionar un cliente que ya existe en el sistema.',
    icon: 'mdi:domain',
  },
];
