import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, Disc, User } from 'lucide-react';
import { Song, Album, Artist } from '../types';

interface SongPageProps {
  songs: Song[];
  albums: Album[];
  artists: Artist[];
}

const SongPage: React.FC<SongPageProps> = ({ songs, albums, artists }) => {
  const { id } = useParams<{ id: string }>();
  const song = songs.find(s => s.id === id);
  const album = albums.find(a => a.id === song?.albumId);
  const artist = artists.find(a => a.id === song?.artistId);

  if (!song || !artist) {
    return <div>Song not found</div>;
  }

  const averageRating = song.ratings.reduce((sum, r) => sum + r.rating, 0) / song.ratings.length || 0;

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg">
      <Link to="/" className="mb-4 inline-block bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded">
        Back to Home
      </Link>
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
              {album ? (
                <Link to={`/album/${album.id}`} className="hover:text-accent">
                  {album.name}
                </Link>
              ) : (
                <span>Single</span>
              )}
            </div>
            <div className="flex items-center">
              <User className="mr-2 text-gray-400" />
              <span>{song.genre}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPage;