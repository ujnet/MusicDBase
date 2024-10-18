import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeContent from './components/HomeContent';
import YourRatings from './components/YourRatings';
import SongPage from './pages/SongPage';
import AlbumPage from './pages/AlbumPage';
import ArtistPage from './pages/ArtistPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import { Song, Album, Artist, SongFormData, User } from './types';
import useLocalStorage from './useLocalStorage';
import { addSong } from './utils/databaseManager';

const AppMain: React.FC = () => {
  const [songs, setSongs] = useLocalStorage<Song[]>('songs', []);
  const [albums, setAlbums] = useLocalStorage<Album[]>('albums', []);
  const [artists, setArtists] = useLocalStorage<Artist[]>('artists', []);
  const [user, setUser] = useLocalStorage<User | null>('user', null);

  const handleAddSong = (songData: SongFormData) => {
    const [updatedSongs, updatedAlbums, updatedArtists] = addSong(songData, songs, albums, artists);
    setSongs(updatedSongs);
    setAlbums(updatedAlbums);
    setArtists(updatedArtists);
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

  const handleSignIn = (email: string, password: string) => {
    // Simulating a sign-in process
    setUser({ id: 'user1', name: 'John Doe', email, password });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleYourRatings = () => {
    // This function can be used to navigate to the YourRatings page
    // You may want to use React Router's navigation here
  };

  const handleAddSongClick = () => {
    // This function can be used to scroll to the AddSongForm
    const addSongForm = document.getElementById('addSongForm');
    if (addSongForm) {
      addSongForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-primary text-white flex flex-col">
        <Header
          user={user}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onYourRatings={handleYourRatings}
          onAddSong={handleAddSongClick}
        />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={
              <HomeContent
                songs={songs}
                albums={albums}
                artists={artists}
                user={user}
                onRateSong={handleRateSong}
                onAddSong={handleAddSong}
              />
            } />
            <Route path="/your-ratings" element={<YourRatings songs={songs} user={user} onReturnHome={() => {}} />} />
            <Route path="/song/:id" element={<SongPage songs={songs} albums={albums} artists={artists} />} />
            <Route path="/album/:id" element={<AlbumPage albums={albums} songs={songs} artists={artists} />} />
            <Route path="/artist/:id" element={<ArtistPage artists={artists} songs={songs} albums={albums} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppMain;