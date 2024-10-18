import React, { useState } from 'react';
import { Artist, Song } from '../types';
import { Star, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArtistListProps {
  artists: Artist[];
  songs: Song[];
  onArtistClick: (artistId: string) => void;
}

type SortOption = 'rating' | 'alphabetical' | 'songCount';

const ArtistList: React.FC<ArtistListProps> = ({ artists, songs, onArtistClick }) => {
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  const calculateAverageRating = (artist: Artist) => {
    const artistSongs = songs.filter(song => song.artistId === artist.id);
    const totalRating = artistSongs.reduce((sum, song) => {
      const songAvg = song.ratings.reduce((sum, rating) => sum + rating.rating, 0) / song.ratings.length || 0;
      return sum + songAvg;
    }, 0);
    return artistSongs.length > 0 ? totalRating / artistSongs.length : 0;
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedArtists = [...filteredArtists].sort((a, b) => {
    switch (sortOption) {
      case 'rating':
        return calculateAverageRating(b) - calculateAverageRating(a);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'songCount':
        return b.songs.length - a.songs.length;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Artist Leaderboard</h2>
      {/* ... (keep the existing search and sort functionality) */}
      <ul className="space-y-4">
        {sortedArtists.map((artist) => {
          const averageRating = calculateAverageRating(artist);

          return (
            <li
              key={artist.id}
              className="bg-primary p-4 rounded-lg flex items-center"
            >
              <Link to={`/artist/${artist.id}`} className="flex-grow flex items-center">
                <img 
                  src={artist.imageUrl} 
                  alt={artist.name} 
                  className="w-16 h-16 object-cover rounded mr-4" 
                />
                <div>
                  <h3 className="text-lg font-semibold">{artist.name}</h3>
                  <p className="text-sm text-gray-400">{artist.songs.length} songs</p>
                </div>
              </Link>
              <div className="flex items-center">
                <span className="text-sm mr-2">{averageRating.toFixed(1)}</span>
                <Star className="text-yellow-400" size={16} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ArtistList;