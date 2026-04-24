import { SearchResult } from './global-search.types';

export interface GlobalSearchRepository {
  search(query: string): Promise<SearchResult[]>;
}
