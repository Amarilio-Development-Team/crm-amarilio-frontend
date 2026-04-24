import { GlobalSearchRepository } from '../domain/global-search.repository';
import { SearchResult } from '../domain/global-search.types';

export class GlobalSearchUseCase {
  constructor(private globalSearchRepository: GlobalSearchRepository) {}

  async execute(query: string): Promise<SearchResult[]> {
    try {
      if (!query) throw new Error('La consulta de búsqueda no puede estar vacía');

      const results = await this.globalSearchRepository.search(query);

      if (results.length === 0) throw new Error('No se encontraron resultados para tu búsqueda');

      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      throw new Error(`Ups, algo salió mal: ${errorMessage}`);
    }
  }
}
