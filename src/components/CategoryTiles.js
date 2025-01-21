import React from 'react';
import { Link } from 'react-router-dom';

const CategoryTiles = ({ categories }) => {
  return (
    <div className="px-8 mb-12">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group relative block w-full"
          >
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-800">
              {category.bannerImage ? (
                <img
                  src={category.bannerImage}
                  alt={category.title}
                  className="absolute w-full h-full object-contain bg-gray-800 opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                  <span className="text-2xl font-bold text-white">{category.title[0]}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTiles;