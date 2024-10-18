import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Music, Disc } from 'lucide-react';
import { Artist, Song, Album } from '../types';

interface ArtistPageProps {
  artists: Artist[];
  songs: Song[];
  albums: Album[];
}

const ArtistPage: React.FC<ArtistPageProps> = ({ artists, songs, albums }) => {
  const { id } = useParams<{ id: string }>();
  const artist = artists.find(a => a.id === id);
  const artistSongs = songs.filter(song => song.artistId === id);
  const artistAlbums = albums.filter(album => album.artistName === artist?.name);

  if (!artist) {
    return <div>Artist not found</div>;
  }

  const averageRating = artistSongs.reduce((sum, song) => {
    const songAvg = song.ratings.reduce((sum, rating) => sum + rating.rating, 0) / song.ratings.length || 0;
    return sum + songAvg;
  }, 0) / artistSongs.length || 0;

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg">
      <Link to="/" className="mb-4 inline-block bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded">
        Back to Home
      </Link>
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
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artistAlbums.map(album => (
            <Link key={album.id} to={`/album/${album.id}`} className="bg-primary p-3 rounded-lg hover:bg-primary/80 transition-colors">
              <img src={album.coverUrl} alt={album.name} className="w-full rounded-lg mb-2" />
              <h3 className="font-semibold">{album.name}</h3>
              <p className="text-sm text-gray-400">{new Date(album.releaseDate).getFullYear()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;