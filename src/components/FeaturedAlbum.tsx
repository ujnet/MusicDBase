import React from 'react';
import { Album, Song } from '../types';
import { Star } from 'lucide-react';

interface FeaturedAlbumProps {
  album: Album;
  songs: Song[];
  onAlbumClick: (albumId: string) => void;
  onSongClick: (songId: string) => void;
}

const FeaturedAlbum: React.FC<FeaturedAlbumProps> = ({ album, songs, onAlbumClick, onSongClick }) => {
  const sortedSongs = [...songs].sort((a, b) => {
    const avgRatingA = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length || 0;
    const avgRatingB = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length || 0;
    return avgRatingB - avgRatingA;
  });

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Album</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
          <img
            src={album.coverUrl}
            alt={album.name}
            className="w-full rounded-lg shadow-lg cursor-pointer"
            onClick={() => onAlbumClick(album.id)}
          />
        </div>
        <div className="md:w-2/3">
          <h3 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => onAlbumClick(album.id)}>
            {album.name}
          </h3>
          <p className="text-gray-400 mb-4">{album.artistName}</p>
          <h4 className="text-lg font-semibold mb-2">Top Tracks:</h4>
          <ul className="space-y-2">
            {sortedSongs.slice(0, 5).map((song) => {
              const avgRating = song.ratings.reduce((sum, r) => sum + r.rating, 0) / song.ratings.length || 0;
              return (
                <li
                  key={song.id}
                  className="flex items-center justify-between bg-primary p-2 rounded-lg cursor-pointer hover:bg-opacity-80"
                  onClick={() => onSongClick(song.id)}
                >
                  <span>{song.title}</span>
                  <div className="flex items-center">
                    <span className="mr-1">{avgRating.toFixed(1)}</span>
                    <Star size={16} className="text-yellow-400" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAlbum;