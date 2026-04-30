'use client';

import React, { useState, useRef, useEffect } from 'react';
import SearchInput from '@/shared/components/SearchInput';
// import { globalSearchAction } from '../actions';

type SearchResult = { id: string; title: string; type: 'USER' | 'PROJECT' };

const GlobalSearchBar: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsPending(true);
    setIsOpen(true);

    try {
      //   const response = await globalSearchAction(query);

      await new Promise(resolve => setTimeout(resolve, 800));
      const mockResults: SearchResult[] = [
        { id: '1', title: `Resultado para "${query}" (Usuario)`, type: 'USER' },
        { id: '2', title: `Otro resultado para "${query}" (Proyecto)`, type: 'PROJECT' },
      ];

      setResults(mockResults);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      setResults([]);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full md:max-w-md">
      <SearchInput onSearch={handleSearch} placeholder="Buscar usuarios, proyectos..." debounceMs={400} />

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          {isPending ? (
            <div className="flex items-center justify-center gap-2 p-4 text-center text-sm text-gray-500">
              <span className="loading loading-spinner loading-sm"></span>
              Buscando...
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {results.map(result => (
                <li key={result.id} className="cursor-pointer border-b border-gray-100 px-4 py-3 transition-colors last:border-0 hover:bg-gray-50">
                  <div className="text-sm font-medium text-gray-800">{result.title}</div>
                  <div className="mt-0.5 text-xs text-gray-400">{result.type}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">No se encontraron resultados.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
