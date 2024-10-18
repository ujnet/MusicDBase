import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';
import { Song, User } from '../types';

interface YourRatingsProps {
  songs: Song[];
  user: User;
  onReturnHome: () => void;
}

type SortOption = 'rating' | 'alphabetical' | 'releaseDate';

const YourRatings: React.FC<YourRatingsProps> = ({ songs, user, onReturnHome }) => {
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  const userRatedSongs = songs.filter(song => song.ratings.some(rating => rating.userId === user.id));

  const filteredSongs = userRatedSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    switch (sortOption) {
      case 'rating':
        const ratingA = a.ratings.find(r => r.userId === user.id)?.rating || 0;
        const ratingB = b.ratings.find(r => r.userId === user.id)?.rating || 0;
        return ratingB - ratingA;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'releaseDate':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Ratings</h2>
        <button
          onClick={onReturnHome}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Return Home
        </button>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your rated songs..."
              className="w-full bg-gray-700 text-white p-2 pl-10 rounded-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="rating">Rating</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="releaseDate">Release Date</option>
          </select>
        </div>
      </div>
      <ul className="space-y-4">
        {sortedSongs.map((song) => {
          const userRating = song.ratings.find(r => r.userId === user.id)?.rating || 0;

          return (
            <li key={song.id} className="bg-gray-700 p-4 rounded-lg flex items-center">
              <img src={song.albumCoverUrl} alt={song.title} className="w-16 h-16 object-cover rounded mr-4" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-400">{song.type === 'album' ? song.albumName : 'Single'} • {song.genre}</p>
                <p className="text-sm text-gray-400">Released: {new Date(song.releaseDate).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400 opacity-30 mb-1">Your rating</span>
                <div className="flex items-center">
                  <span className="mr-2">{userRating}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          star <= userRating
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default YourRatings;