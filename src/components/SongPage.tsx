import React from 'react';
import { Star, Clock, Calendar, Disc, User } from 'lucide-react';
import { Song, Album, Artist } from '../types';

interface SongPageProps {
  song: Song;
  album: Album | null;
  artist: Artist;
  onBack: () => void;
}

const SongPage: React.FC<SongPageProps> = ({ song, album, artist, onBack }) => {
  const averageRating = song.ratings.reduce((sum, r) => sum + r.rating, 0) / song.ratings.length || 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <button
        onClick={onBack}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Leaderboard
      </button>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
          <img src={song.albumCoverUrl} alt={song.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
          <p className="text-xl text-gray-400 mb-4">{artist.name}</p>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-1" />
            <span className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</span>
            <span className="text-gray-400">({song.ratings.length} ratings)</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="mr-2 text-gray-400" />
              <span>{song.duration}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 text-gray-400" />
              <span>{new Date(song.releaseDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Disc className="mr-2 text-gray-400" />
              <span>{song.type === 'album' ? album?.name : 'Single'}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 text-gray-400" />
              <span>{song.genre}</span>
            </div>
          </div>
          {/* Add more song details here */}
        </div>
      </div>
      {/* Add sections for lyrics, user comments, etc. */}
    </div>
  );
};

export default SongPage;