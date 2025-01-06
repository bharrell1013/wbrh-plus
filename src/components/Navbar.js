import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-[#0F1014] bg-opacity-90 z-50 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-white">
            WBRH<span className="text-3xl font-light">+</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/category/react" className="text-gray-300 hover:text-white">React</Link>
            <Link to="/category/react-native" className="text-gray-300 hover:text-white">React Native</Link>
            <Link to="/category/films" className="text-gray-300 hover:text-white">Films</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Add profile/settings buttons here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;