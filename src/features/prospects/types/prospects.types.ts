interface SalesPerson {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface SalesRepresentative extends SalesPerson {
  region: string;
}

export type StatusProspect = 'atraccion' | 'en_revision' | 'analisis_necesidades' | 'esperando_cotizacion' | 'propuesta_enviada' | 'negociacion' | 'ganada' | 'perdida' | 'suspendida';

export interface TechnicalRequirement {
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
  etapaOportunidad: StatusProspect;
  requerimientosTecnicos: TechnicalRequirement[];
}

export type ClientResult = {
  id: string;
  name: string;
  rfc: string;
};
