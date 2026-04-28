import { globalSearchAction } from '../../global-search/application/global-search.actions';
import { ClientResult } from '../../global-search/application/global-search.types';

export async function searchClientAction(query: string): Promise<ClientResult[]> {
  try {
    const response = await globalSearchAction(query);

    if (!response.success || !response.results) {
      return [];
    }

    const clientsOnly = response.results.filter(result => 'rfc' in result) as ClientResult[];

    return clientsOnly;
  } catch (error) {
    console.error('Error buscando clientes:', error);
    return [];
  }
}
