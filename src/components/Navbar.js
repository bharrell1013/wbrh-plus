// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../firebaseUtils';

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      categoriesData.reverse(); // Reverse order to show latest first
      console.log('Navbar categories:', categoriesData);
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-[#0F1014] bg-opacity-90 z-50 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-white">
            WBRH<span className="text-3xl font-light">+</span>
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white">
              About Me
            </Link>
            <Link to="/film-minor" className="text-gray-300 hover:text-white">
              Film Minor
            </Link>
          <div className="hidden md:flex space-x-6">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="text-gray-300 hover:text-white"
              >
                {category.title}
              </Link>
            ))}
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