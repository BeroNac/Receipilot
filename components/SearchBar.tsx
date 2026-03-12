'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by order ID, product, store, or date..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-4 py-6 text-lg"
      />
    </div>
  );
}
