import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredProjects = [
    {
      id: 1,
      title: "Featured Project 1",
      image: "https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/gamequill.png?alt=media&token=b044a49e-c70e-4e12-adef-9195ca293d6b",
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