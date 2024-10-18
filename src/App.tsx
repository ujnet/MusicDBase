import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';
import AddSongForm from './components/AddSongForm';
import SongList from './components/SongList';
import AlbumList from './components/AlbumList';
import ArtistList from './components/ArtistList';
import Header from './components/Header';
import YourRatings from './components/YourRatings';
import SongPage from './components/SongPage';
import AlbumPage from './components/AlbumPage';
import ArtistPage from './components/ArtistPage';
import AlbumCarousel from './components/AlbumCarousel';
import { Song, Album, Artist, SongFormData, User } from './types';

type Page = 'home' | 'yourRatings' | 'song' | 'album' | 'artist';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [randomAlbums, setRandomAlbums] = useState<Album[]>([]);

  useEffect(() => {
    if (albums.length > 0) {
      const shuffled = [...albums].sort(() => 0.5 - Math.random());
      setRandomAlbums(shuffled.slice(0, 5));
    }
  }, [albums]);

  const handleAddSong = (songData: SongFormData) => {
    // ... (handleAddSong implementation remains unchanged)
  };

  const handleRateSong = (id: string, rating: number) => {
    setSongs(prevSongs =>
      prevSongs.map(song =>
        song.id === id
          ? {
              ...song,
              ratings: [...song.ratings.filter(r => r.userId !== user?.id), { userId: user?.id || '', rating }],
            }
          : song
      )
    );
  };

  const handleSignIn = () => {
    // Simulating a sign-in process
    setUser({ id: 'user1', name: 'John Doe', email: 'john@example.com' });
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleYourRatings = () => {
    setCurrentPage('yourRatings');
  };

  const handleReturnHome = () => {
    setCurrentPage('home');
  };

  const handleSongClick = (songId: string) => {
    setSelectedItemId(songId);
    setCurrentPage('song');
  };

  const handleAlbumClick = (albumId: string) => {
    setSelectedItemId(albumId);
    setCurrentPage('album');
  };

  const handleArtistClick = (artistId: string) => {
    setSelectedItemId(artistId);
    setCurrentPage('artist');
  };

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
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome to MusicDB</h2>
              <p className="text-gray-300">
                Discover, rate, and share your favorite music. Add new songs, explore albums, and connect with artists. Your personalized music journey starts here!
              </p>
            </div>
            <AlbumCarousel
              albums={randomAlbums}
              songs={songs}
              onAlbumClick={handleAlbumClick}
              onSongClick={handleSongClick}
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
            <div className="mt-8">
              <AddSongForm onAddSong={handleAddSong} existingSongs={songs} existingAlbums={albums} existingArtists={artists} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onYourRatings={handleYourRatings}
      />
      <div className="p-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center">
            <Music className="mr-2" />
            MusicDB
          </h1>
        </header>
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;