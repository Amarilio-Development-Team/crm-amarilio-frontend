import { globalSearch } from '../infrastructure/global-search.api';
import { SearchResult } from '../application/global-search.types';

type ActionResponse = { error?: string; results?: SearchResult[]; success?: boolean };

export async function globalSearchAction(query: string): Promise<ActionResponse> {
  try {
    const results = await globalSearch(query);

    return { results, success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al realizar la búsqueda';
    return { error: errorMessage, success: false };
  }
}
