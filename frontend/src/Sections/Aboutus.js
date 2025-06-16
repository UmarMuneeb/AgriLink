import React from 'react';
import aboutImg from '../Assets/aboutUs.webp'; // Replace with your actual image path

const AboutUs = () => {
  return (
    <div className="bg-white py-16 px-6 md:px-20 font-poppins">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <img
            src={aboutImg}
            alt="About AgriLink"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-green-700 mb-6">About AgriLink</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            AgriLink is dedicated to transforming agriculture by connecting farmers directly with buyers.
            We enable smarter farming practices, fairer pricing, and a transparent marketplace for all.
            With technology and community, we’re building a better agricultural future together.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
