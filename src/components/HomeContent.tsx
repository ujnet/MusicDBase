import React from 'react';
import { useNavigate } from 'react-router-dom';
import SongList from './SongList';
import AlbumList from './AlbumList';
import ArtistList from './ArtistList';
import FeaturedAlbums from './FeaturedAlbums';
import AddSongForm from './AddSongForm';
import { Song, Album, Artist, SongFormData, User } from '../types';

interface HomeContentProps {
  songs: Song[];
  albums: Album[];
  artists: Artist[];
  user: User | null;
  onRateSong: (id: string, rating: number) => void;
  onAddSong: (songData: SongFormData) => void;
}

const HomeContent: React.FC<HomeContentProps> = ({
  songs,
  albums,
  artists,
  user,
  onRateSong,
  onAddSong,
}) => {
  const navigate = useNavigate();

  const handleSongClick = (songId: string) => {
    navigate(`/song/${songId}`);
  };

  const handleAlbumClick = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  const handleArtistClick = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-white">Welcome to MusicDB</h2>
        <p className="text-gray-300">
          Discover, rate, and share your favorite music. Add new songs, explore albums, and connect with artists. Your personalized music journey starts here!
        </p>
      </div>
      <FeaturedAlbums
        albums={albums}
        songs={songs}
        artists={artists}
        onAlbumClick={handleAlbumClick}
        onSongClick={handleSongClick}
        onArtistClick={handleArtistClick}
      />
      <div className="mt-8">
        <SongList
          songs={songs}
          onRateSong={onRateSong}
          currentUserId={user?.id || ''}
          onSongClick={handleSongClick}
        />
      </div>
      <div className="mt-8">
        <AlbumList albums={albums} songs={songs} onAlbumClick={handleAlbumClick} />
      </div>
      <div className="mt-8">
        <ArtistList artists={artists} songs={songs} onArtistClick={handleArtistClick} />
      </div>
      <div className="mt-8" id="addSongForm">
        <AddSongForm onAddSong={onAddSong} existingSongs={songs} existingAlbums={albums} existingArtists={artists} />
      </div>
    </>
  );
};

export default HomeContent;