import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <div className="bg-secondary p-6 rounded-lg shadow-lg">
        {/* INSERT YOUR PRIVACY POLICY TEXT HERE */}
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <p>
          MusicDB collects and processes certain personal information from users, including but not limited to email addresses, usernames, and music preferences.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">2. How We Use Your Information</h2>
        <p>
          We use the collected information to provide and improve our services, personalize user experience, and communicate with users about updates and features.
        </p>

        {/* ADD MORE SECTIONS AS NEEDED */}
        
        {/* END OF PRIVACY POLICY TEXT */}
      </div>
    </div>
  );
};

export default PrivacyPage;