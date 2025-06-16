import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../Assets/logo.jpg";
import person from '../Assets/person.jpeg';

const Navbar = ({ isListingsPage = false }) => {
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");

        const user = await response.json();
        const email = user.email || "";
        const name = email.split("@")[0];
        setUsername(name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative px-4 py-3 flex flex-col md:flex-row items-center justify-between font-poppins bg-white top-0 z-50 shadow-sm">
      
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        <img src={logo} className="w-12" alt="logo" />
        <p className="text-xl md:text-2xl font-bold">AgriLink</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 text-sm md:text-base">
        {!isListingsPage && (
          <button onClick={handleScrollToAbout} className="hover:underline">About</button>
        )}

        <button
          onClick={() => navigate(isListingsPage ? "/home" : "/listings")}
          className="hover:underline"
        >
          {isListingsPage ? "Home" : "Marketplace"}
        </button>
        <div className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-full text-white font-semibold">
          <img src={person} className="w-7 h-7 rounded-full object-cover" alt="user" />
          <p className="text-sm truncate max-w-[100px]">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
