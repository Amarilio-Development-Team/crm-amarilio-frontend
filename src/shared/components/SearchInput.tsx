'use client';

import React, { useState, useMemo, useEffect } from 'react';
import debounce from 'just-debounce-it';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = 'Busca nombres, clientes, proyectos y más...', className = '', debounceMs = 500 }) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, debounceMs),
    [onSearch, debounceMs]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <div
      className={`container-color flex w-full items-center rounded-md border border-transparent px-3 py-2 transition-all duration-200 focus-within:border-gray-200 focus-within:shadow-sm ${className}`}
    >
      <svg className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-strong w-full border-none bg-transparent text-sm outline-none"
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};

export default SearchInput;
