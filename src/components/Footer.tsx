import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">MusicDB</h3>
            <p className="text-sm">Your ultimate music database and rating platform.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-accent">About MusicDB</Link></li>
              <li><Link to="/terms" className="hover:text-accent">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://twitter.com/musicdb" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                <Twitter size={24} />
              </a>
              <a href="https://tiktok.com/@musicdb" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                <Music size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MusicDB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;