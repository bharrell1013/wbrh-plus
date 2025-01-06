import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredProjects = [
    {
      id: 1,
      title: "Featured Project 1",
      image: "/api/placeholder/1200/500",
      category: "React"
    },
    // Add more featured projects
  ];

  return (
    <div className="relative h-96 mt-16">
      <div className="absolute inset-0">
        <img 
          src={featuredProjects[currentSlide].image}
          alt={featuredProjects[currentSlide].title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Add navigation dots/arrows here */}
    </div>
  );
};

export default HeroSlider;