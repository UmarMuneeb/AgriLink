import React from 'react';
import Heroimg from '../Assets/hero.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full font-poppins" style={{ height: '80vh' }}>
      {/* Background image */}
      <div
        className="bg-cover bg-no-repeat bg-center w-full h-full absolute top-0 left-0"
        style={{
          backgroundImage: `url(${Heroimg})`,
          filter: "brightness(65%)"
        }}
      ></div>

      {/* Foreground content */}
      <div className="text-white h-full w-full relative flex justify-center items-center">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="font-bold text-4xl text-center">
            Grow Smart. Farm Better.
          </div>
          <div className="font-bold text-sm text-center">
            AgriLink connects farmers, buyers, and tools for a better tomorrow.
          </div>
          <div className="flex gap-3 flex-row">
            <button
              className="bg-green-600 font-bold text-sm p-3 rounded-2xl"
              onClick={() => navigate("/listings")}
            >
              Order Now
            </button>
            <button
              className="text-green-600 bg-white font-bold text-sm p-3 rounded-2xl"
              onClick={handleLearnMore}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
