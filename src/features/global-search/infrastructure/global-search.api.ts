import { SearchResult } from '../application/global-search.types';

const API_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export const globalSearch = async (query: string): Promise<SearchResult[]> => {
  // const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`, {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // if (!response.ok) {
  //   const errorData = await response.json();
  //   throw new Error(errorData.message || 'Ups, algo salió mal');
  // }

  // const data = await response.json();
  // return data.results as SearchResult[];
  const data: SearchResult[] = [
    { id: '1', name: 'Hello', rfc: 'USER' },
    { id: '2', name: 'World', rfc: 'PROJECT' },
    { id: '3', name: 'Hello', rfc: 'USER' },
    { id: '4', name: 'World', rfc: 'PROJECT' },
    { id: '5', name: 'Hello', rfc: 'USER' },
    { id: '6', name: 'World', rfc: 'PROJECT' },
    { id: '7', name: 'Hello', rfc: 'USER' },
    { id: '8', name: 'World', rfc: 'PROJECT' },
    { id: '9', name: 'Hello', rfc: 'USER' },
    { id: '10', name: 'World', rfc: 'PROJECT' },
    { id: '11', name: 'Hello', rfc: 'USER' },
    { id: '12', name: 'World', rfc: 'PROJECT' },
  ];
  return data;
};
