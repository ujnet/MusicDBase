import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Calendar, Music, User } from 'lucide-react';
import { Album, Song, Artist } from '../types';

interface AlbumPageProps {
  albums: Album[];
  songs: Song[];
  artists: Artist[];
}

const AlbumPage: React.FC<AlbumPageProps> = ({ albums, songs, artists }) => {
  const { id } = useParams<{ id: string }>();
  const album = albums.find(a => a.id === id);
  const albumSongs = songs.filter(song => song.albumId === id);
  const artist = artists.find(a => a.name === album?.artistName);

  if (!album || !artist) {
    return <div>Album not found</div>;
  }

  const averageRating = albumSongs.reduce((sum, song) => {
    const songAvg = song.ratings.reduce((sum, rating) => sum + rating.rating, 0) / song.ratings.length || 0;
    return sum + songAvg;
  }, 0) / albumSongs.length || 0;

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg">
      <Link to="/" className="mb-4 inline-block bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded">
        Back to Home
      </Link>
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
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tracklist</h2>
        <ul className="space-y-2">
          {albumSongs.map((song, index) => (
            <li
              key={song.id}
              className="flex items-center justify-between bg-primary p-3 rounded-lg hover:bg-primary/80 transition-colors"
            >
              <Link to={`/song/${song.id}`} className="flex items-center flex-grow">
                <span className="mr-4 text-gray-400">{index + 1}</span>
                <span>{song.title}</span>
              </Link>
              <span>{song.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumPage;