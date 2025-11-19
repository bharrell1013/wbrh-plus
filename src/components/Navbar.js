// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-[#090b13] to-transparent z-50 px-4 md:px-8 py-4 transition-all duration-300">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl font-bold text-white flex-shrink-0">
          WBRH<span className="text-2xl md:text-3xl font-light">+</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/about" className="text-gray-300 hover:text-white whitespace-nowrap">
            About Me
          </Link>
          <Link 
            to="/category/professional"
            className="text-gray-300 hover:text-white whitespace-nowrap"
          >
            Professional Experience
          </Link>
          <Link 
            to="/category/personal"
            className="text-gray-300 hover:text-white whitespace-nowrap"
          >
            Personal Projects
          </Link>
          <Link to="/film-minor" className="text-gray-300 hover:text-white whitespace-nowrap">
            Film Minor
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 bg-[#090b13]/95 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col space-y-3 px-4">
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Me
            </Link>
            <Link 
              to="/category/professional"
              className="text-gray-300 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Professional Experience
            </Link>
            <Link 
              to="/category/personal"
              className="text-gray-300 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Personal Projects
            </Link>
            <Link 
              to="/film-minor" 
              className="text-gray-300 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Film Minor
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;