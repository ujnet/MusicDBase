import React from 'react';
import { Music } from 'lucide-react';
import AddSongForm from './components/AddSongForm';
import SongList from './components/SongList';
import AlbumList from './components/AlbumList';
import ArtistList from './components/ArtistList';
import Header from './components/Header';
import Footer from './components/Footer';
import YourRatings from './components/YourRatings';
import SongPage from './pages/SongPage';
import AlbumPage from './pages/AlbumPage';
import ArtistPage from './pages/ArtistPage';
import FeaturedAlbums from './components/FeaturedAlbums';
import { Song, Album, Artist, SongFormData, User } from './types';
import useLocalStorage from './useLocalStorage';
import { clearDatabase, addSong } from './utils/databaseManager';

type Page = 'home' | 'yourRatings' | 'song' | 'album' | 'artist';

const App: React.FC = () => {
  const [songs, setSongs] = useLocalStorage<Song[]>('songs', []);
  const [albums, setAlbums] = useLocalStorage<Album[]>('albums', []);
  const [artists, setArtists] = useLocalStorage<Artist[]>('artists', []);
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [currentPage, setCurrentPage] = useLocalStorage<Page>('currentPage', 'home');
  const [selectedItemId, setSelectedItemId] = useLocalStorage<string | null>('selectedItemId', null);

  // ... (keep all other functions unchanged)

  const renderContent = () => {
    switch (currentPage) {
      case 'yourRatings':
        return user ? (
          <YourRatings songs={songs} user={user} onReturnHome={handleReturnHome} />
        ) : null;
      case 'song':
        const song = songs.find(s => s.id === selectedItemId);
        const album = albums.find(a => a.id === song?.albumId);
        const artist = artists.find(a => a.id === song?.artistId);
        return song && artist ? (
          <SongPage song={song} album={album || null} artist={artist} onBack={handleReturnHome} />
        ) : null;
      case 'album':
        const selectedAlbum = albums.find(a => a.id === selectedItemId);
        const albumArtist = artists.find(a => a.name === selectedAlbum?.artistName);
        return selectedAlbum && albumArtist ? (
          <AlbumPage
            album={selectedAlbum}
            songs={songs}
            artist={albumArtist}
            onBack={handleReturnHome}
            onSongClick={handleSongClick}
          />
        ) : null;
      case 'artist':
        const selectedArtist = artists.find(a => a.id === selectedItemId);
        return selectedArtist ? (
          <ArtistPage
            artist={selectedArtist}
            songs={songs}
            albums={albums}
            onBack={handleReturnHome}
            onSongClick={handleSongClick}
            onAlbumClick={handleAlbumClick}
          />
        ) : null;
      default:
        return (
          <>
            <div className="bg-secondary p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">Welcome to MusicDB</h2>
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
                onRateSong={handleRateSong}
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
              <AddSongForm onAddSong={handleAddSong} existingSongs={songs} existingAlbums={albums} existingArtists={artists} />
            </div>
          </>
        );
    }
  };

  // ... (keep the rest of the component unchanged)
};

export default App;