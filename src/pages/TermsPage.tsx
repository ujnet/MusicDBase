import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <div className="bg-secondary p-6 rounded-lg shadow-lg">
        {/* INSERT YOUR TERMS OF SERVICE TEXT HERE */}
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing and using MusicDB, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">2. Use of Service</h2>
        <p>
          MusicDB provides a platform for users to discover, rate, and share music. Users are responsible for their own actions and content submitted to the platform.
        </p>

        {/* ADD MORE SECTIONS AS NEEDED */}
        
        {/* END OF TERMS OF SERVICE TEXT */}
      </div>
    </div>
  );
};

export default TermsPage;