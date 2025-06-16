import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm font-poppins">
        <p>&copy; {new Date().getFullYear()} AgriLink. All rights reserved.</p>
        <p className="mt-2">
          Built with 💚 to empower farmers and modernize agriculture.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
