import { SearchResult } from '../application/global-search.types';

const API_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export const globalSearch = async (query: string): Promise<SearchResult[]> => {
  const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ups, algo salió mal');
  }

  const data = await response.json();
  return data.results as SearchResult[];
};
