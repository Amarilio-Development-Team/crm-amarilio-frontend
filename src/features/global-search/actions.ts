'use server';

import { SearchResult } from './types/global-search.types';

// const API_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

type ActionResponse = {
  error?: string;
  results?: SearchResult[];
  success?: boolean;
};

export async function globalSearchAction(query: string): Promise<ActionResponse> {
  try {
    if (!query || query.trim() === '') {
      return { success: true, results: [] };
    }

    const mockData: SearchResult[] = [
      { id: '1', name: 'Hello', rfc: 'USER' },
      { id: '2', name: 'World', rfc: 'PROJECT' },
      { id: '3', name: 'Hello', rfc: 'USER' },
      { id: '4', name: 'World', rfc: 'PROJECT' },
      { id: '5', name: 'Hello', rfc: 'USER' },
      { id: '6', name: 'World', rfc: 'PROJECT' },
    ];

    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: true, results: mockData };

    /*
    const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.detail || 'Ups, algo salió mal en la búsqueda');
    }

    const data = await response.json();
    return { success: true, results: data.results as SearchResult[] };
    */
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al realizar la búsqueda';
    return { success: false, error: errorMessage };
  }
}
