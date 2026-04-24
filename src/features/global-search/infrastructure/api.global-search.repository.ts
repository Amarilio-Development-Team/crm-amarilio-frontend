import { GlobalSearchRepository } from '../domain/global-search.repository';
import { SearchResult } from '../domain/global-search.types';

export class ApiGlobalSearchRepository implements GlobalSearchRepository {
  async search(query: string): Promise<SearchResult[]> {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ups, algo salió mal');
    }

    const data = await response.json();
    return data.results as SearchResult[];
  }
}
