import React, { useState } from 'react';
import { User, LogIn, LogOut, Plus } from 'lucide-react';
import { User as UserType } from '../types';
import SignInModal from './SignInModal';
import { Link } from 'react-router-dom';

interface HeaderProps {
  user: UserType | null;
  onSignIn: (email: string, password: string) => void;
  onSignOut: () => void;
  onYourRatings: () => void;
  onAddSong: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onSignIn, onSignOut, onYourRatings, onAddSong }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };

  const handleSignInSubmit = (email: string, password: string) => {
    onSignIn(email, password);
    setShowSignInModal(false);
  };

  return (
    <header className="bg-secondary py-4 px-6 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-white hover:text-accent transition-colors">
        MusicDB
      </Link>
      <div className="flex items-center space-x-4">
        <button
          onClick={onAddSong}
          className="bg-accent hover:bg-accent/80 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add a Song
        </button>
        {user && (
          <button
            onClick={onYourRatings}
            className="bg-accent hover:bg-accent/80 text-white font-bold py-2 px-4 rounded"
          >
            Your Ratings
          </button>
        )}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
            >
              <User size={20} />
              <span>{user.name}</span>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-primary rounded-md shadow-lg py-1">
                <button
                  onClick={onSignOut}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-secondary w-full text-left"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleSignInClick}
            className="flex items-center space-x-2 bg-accent hover:bg-accent/80 text-white font-bold py-2 px-4 rounded"
          >
            <LogIn size={20} />
            <span>Sign In</span>
          </button>
        )}
      </div>
      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)} onSignIn={handleSignInSubmit} />
      )}
    </header>
  );
};

export default Header;