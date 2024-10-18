import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Song } from '../types';

interface SearchBarProps {
  songs: Song[];
  onSearchResults: (results: Song[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ songs, onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = songs.filter((song) =>
      Object.values(song).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
    onSearchResults(results);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs, albums, artists, or genres..."
          className="w-full bg-gray-700 text-white p-2 pl-10 rounded-lg"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </form>
  );
};

export default SearchBar;