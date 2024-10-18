import React from 'react';
import { Star, Calendar, Music, User } from 'lucide-react';
import { Album, Song, Artist } from '../types';

interface AlbumPageProps {
  album: Album;
  songs: Song[];
  artist: Artist;
  onBack: () => void;
  onSongClick: (songId: string) => void;
}

const AlbumPage: React.FC<AlbumPageProps> = ({ album, songs, artist, onBack, onSongClick }) => {
  const albumSongs = songs.filter(song => song.albumId === album.id);
  const averageRating = albumSongs.reduce((sum, song) => {
    const songAvg = song.ratings.reduce((sum, rating) => sum + rating.rating, 0) / song.ratings.length || 0;
    return sum + songAvg;
  }, 0) / albumSongs.length || 0;

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
          <img src={album.coverUrl} alt={album.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{album.name}</h1>
          <p className="text-xl text-gray-400 mb-4">{artist.name}</p>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-1" />
            <span className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</span>
            <span className="text-gray-400">({albumSongs.reduce((sum, song) => sum + song.ratings.length, 0)} ratings)</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Music className="mr-2 text-gray-400" />
              <span>{albumSongs.length} songs</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 text-gray-400" />
              <span>{new Date(album.releaseDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 text-gray-400" />
              <span>{albumSongs[0]?.genre || 'Various'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tracklist</h2>
        <ul className="space-y-2">
          {albumSongs.map((song, index) => (
            <li
              key={song.id}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600"
              onClick={() => onSongClick(song.id)}
            >
              <div className="flex items-center">
                <span className="mr-4 text-gray-400">{index + 1}</span>
                <span>{song.title}</span>
              </div>
              <span>{song.duration}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Add sections for user comments, etc. */}
    </div>
  );
};

export default AlbumPage;