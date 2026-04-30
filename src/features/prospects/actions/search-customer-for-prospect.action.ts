'use server';

import { ClientResult } from '../types/prospects.types';

interface SearchClientResponse {
  success: boolean;
  error?: string;
  clients?: ClientResult[];
}

export async function searchCustomerForProspectAction(query: string): Promise<SearchClientResponse> {
  try {
    if (!query || query.trim() === '') {
      return { success: true, clients: [] };
    }

    const mockClients: ClientResult[] = [
      { id: '1', name: 'Empresa Alpha', rfc: 'ALPHA123' },
      { id: '2', name: 'Corporativo Beta', rfc: 'BETA456' },
    ];

    const filteredClients = mockClients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

    return { success: true, clients: filteredClients };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado al buscar los clientes';
    console.error('Error in searchClientAction:', errorMessage);
    return { success: false, error: 'Ocurrió un error inesperado al buscar los clientes' };
  }
}
