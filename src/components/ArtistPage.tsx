import React from 'react';
import { Star, Music, Disc } from 'lucide-react';
import { Artist, Song, Album } from '../types';

interface ArtistPageProps {
  artist: Artist;
  songs: Song[];
  albums: Album[];
  onBack: () => void;
  onSongClick: (songId: string) => void;
  onAlbumClick: (albumId: string) => void;
}

const ArtistPage: React.FC<ArtistPageProps> = ({ artist, songs, albums, onBack, onSongClick, onAlbumClick }) => {
  const artistSongs = songs.filter(song => song.artistId === artist.id);
  const artistAlbums = albums.filter(album => album.artistName === artist.name);
  const averageRating = artistSongs.reduce((sum, song) => {
    const songAvg = song.ratings.reduce((sum, rating) => sum + rating.rating, 0) / song.ratings.length || 0;
    return sum + songAvg;
  }, 0) / artistSongs.length || 0;

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
          <img src={artist.imageUrl} alt={artist.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-1" />
            <span className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</span>
            <span className="text-gray-400">({artistSongs.reduce((sum, song) => sum + song.ratings.length, 0)} ratings)</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Music className="mr-2 text-gray-400" />
              <span>{artistSongs.length} songs</span>
            </div>
            <div className="flex items-center">
              <Disc className="mr-2 text-gray-400" />
              <span>{artistAlbums.length} albums</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Top Songs</h2>
        <ul className="space-y-2">
          {artistSongs
            .sort((a, b) => {
              const avgA = a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length || 0;
              const avgB = b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length || 0;
              return avgB - avgA;
            })
            .slice(0, 5)
            .map((song, index) => (
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
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artistAlbums.map(album => (
            <div
              key={album.id}
              className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600"
              onClick={() => onAlbumClick(album.id)}
            >
              <img src={album.coverUrl} alt={album.name} className="w-full rounded-lg mb-2" />
              <h3 className="font-semibold">{album.name}</h3>
              <p className="text-sm text-gray-400">{new Date(album.releaseDate).getFullYear()}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Add sections for biography, user comments, etc. */}
    </div>
  );
};

export default ArtistPage;