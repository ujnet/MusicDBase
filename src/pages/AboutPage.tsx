import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About MusicDB</h1>
      <div className="bg-secondary p-6 rounded-lg shadow-lg">
        <p>
          MusicDB is a platform dedicated to music lovers, offering a comprehensive database of songs, albums, and artists. Our mission is to provide a space where users can discover, rate, and share their favorite music.
        </p>
        <p className="mt-4">
          Founded in 2024, MusicDB has grown to become a community-driven resource for music enthusiasts around the world. We strive to offer accurate information, insightful ratings, and a user-friendly interface to enhance your music exploration experience.
        </p>
        <div className="mt-6 p-4 bg-primary rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Under Construction</h2>
          <p>
            Please note that MusicDB is a new website and is still under construction. We're working hard to bring you more features and improvements. Stay tuned for updates coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;