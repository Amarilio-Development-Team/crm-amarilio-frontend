interface SalesPerson {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface SalesRepresentative extends SalesPerson {
  region: string;
}

export type EtapaOportunidad = 'atraccion' | 'en_revision' | 'analisis_necesidades' | 'esperando_cotizacion' | 'propuesta_enviada' | 'negociacion' | 'ganada' | 'perdida' | 'suspendida';

export interface RequerimientoTecnico {
  descripcion: string;
  prioridad: 'alta' | 'media' | 'baja';
  observaciones: string | null;
}

export interface Prospect {
  clientID: string;
  title: string;
  description: string;
  estimatedPrice: number | null;
  productId: string[] | null;
  clientId: string;
  salesPerson: SalesPerson | null;
  salesRepresentative: SalesRepresentative | null;
  fechaCreacion: Date;
  etapaOportunidad: EtapaOportunidad;
  requerimientosTecnicos: RequerimientoTecnico[];
}

export interface ProspectRepository {
  createProspect: (proposalData: Prospect) => Promise<string>;
}
