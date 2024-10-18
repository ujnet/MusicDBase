import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';
import { Song } from '../types';
import { Link } from 'react-router-dom';

interface SongListProps {
  songs: Song[];
  onRateSong: (id: string, rating: number) => void;
  currentUserId: string;
}

type SortOption = 'rating' | 'alphabetical' | 'releaseDate';

const SongList: React.FC<SongListProps> = ({ songs, onRateSong, currentUserId }) => {
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    switch (sortOption) {
      case 'rating':
        const avgA = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length || 0;
        const avgB = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length || 0;
        return avgB - avgA;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'releaseDate':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Song Leaderboard</h2>
      {/* ... (keep the existing search and sort functionality) */}
      <ul className="space-y-4">
        {sortedSongs.map((song) => {
          const userRating = song.ratings.find(r => r.userId === currentUserId)?.rating;
          const averageRating = song.ratings.reduce((sum, r) => sum + r.rating, 0) / song.ratings.length || 0;

          return (
            <li
              key={song.id}
              className="bg-primary p-4 rounded-lg flex items-center"
            >
              <Link to={`/song/${song.id}`} className="flex-grow flex items-center">
                <img 
                  src={song.albumCoverUrl} 
                  alt={song.title} 
                  className="w-16 h-16 object-cover rounded mr-4" 
                />
                <div>
                  <h3 className="text-lg font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-400">{song.type === 'album' ? 'Album' : 'Single'} • {song.genre}</p>
                </div>
              </Link>
              <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                  <span className="text-sm mr-2">Avg: {averageRating.toFixed(1)}</span>
                  <Star className="text-yellow-400" size={16} />
                </div>
                {currentUserId && (
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Your rating:</span>
                    <select
                      value={userRating || ''}
                      onChange={(e) => onRateSong(song.id, Number(e.target.value))}
                      className="bg-secondary text-white p-1 rounded cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="">-</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SongList;