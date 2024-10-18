import React, { useState } from 'react';
import { Album, Song } from '../types';
import { Star, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AlbumListProps {
  albums: Album[];
  songs: Song[];
  onAlbumClick: (albumId: string) => void;
}

type SortOption = 'rating' | 'alphabetical' | 'releaseDate';

const AlbumList: React.FC<AlbumListProps> = ({ albums, songs, onAlbumClick }) => {
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  const calculateAverageRating = (album: Album) => {
    const albumSongs = songs.filter(song => song.albumId === album.id);
    const totalRating = albumSongs.reduce((sum, song) => {
      const songAvg = song.ratings.reduce((sum, rating) => sum + rating.rating, 0) / song.ratings.length || 0;
      return sum + songAvg;
    }, 0);
    return albumSongs.length > 0 ? totalRating / albumSongs.length : 0;
  };

  const filteredAlbums = albums.filter(album =>
    album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artistName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAlbums = [...filteredAlbums].sort((a, b) => {
    switch (sortOption) {
      case 'rating':
        return calculateAverageRating(b) - calculateAverageRating(a);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'releaseDate':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Album Leaderboard</h2>
      {/* ... (keep the existing search and sort functionality) */}
      <ul className="space-y-4">
        {sortedAlbums.map((album) => {
          const averageRating = calculateAverageRating(album);

          return (
            <li
              key={album.id}
              className="bg-primary p-4 rounded-lg flex items-center"
            >
              <Link to={`/album/${album.id}`} className="flex-grow flex items-center">
                <img 
                  src={album.coverUrl} 
                  alt={album.name} 
                  className="w-16 h-16 object-cover rounded mr-4" 
                />
                <div>
                  <h3 className="text-lg font-semibold">{album.name}</h3>
                  <p className="text-sm text-gray-400">{album.artistName}</p>
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

export default AlbumList;