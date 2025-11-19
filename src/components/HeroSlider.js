import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = ({ projects = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered && projects.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % projects.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isHovered, projects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!projects.length) return null;

  return (
    <div className="w-full px-4 md:px-12 pt-6 pb-8">
      <div 
        className="relative w-full rounded-xl overflow-hidden shadow-[0_26px_30px_-10px_rgba(0,0,0,0.7)]"
        style={{ height: 'clamp(300px, 50vh, 600px)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides */}
        <div className="relative w-full h-full bg-[#1e2129]">
          {projects.map((project, index) => {
            const needsContain = project.imageFit === 'contain' || 
                                 project.id === 'wbrh-plus' || 
                                 project.title?.toLowerCase().includes('wbrh');
            
            return (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`group absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={project.imageUrl || "/api/placeholder/1920/1080"}
                  alt={project.title}
                  className={`w-full h-full ${needsContain ? 'object-contain' : 'object-cover'}`}
                  style={{ 
                    objectFit: needsContain ? 'contain' : 'cover', 
                    objectPosition: 'center' 
                  }}
                />
                {/* Vignette/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1d29] via-[#1a1d29]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d29] via-transparent to-transparent" />
                
                <div 
                  className="absolute bottom-0 left-0 top-0 flex flex-col justify-end md:justify-center p-8 md:p-16 max-w-3xl pb-12 md:pb-16 pointer-events-none"
                >
                  <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg leading-tight">
                    {project.title}
                  </h2>
                  <div className="mb-4 md:mb-6 pointer-events-auto">
                    <p className="text-gray-100 text-sm md:text-lg lg:text-xl drop-shadow-md font-medium line-clamp-3 md:line-clamp-none">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform md:translate-y-4 md:group-hover:translate-y-0 pointer-events-auto">
                    <span className="hidden md:inline-block bg-white text-black px-6 py-3 rounded font-bold text-sm hover:bg-gray-200 transition-colors">
                      View Details
                    </span>
                    {project.technologies?.slice(0, 3).map(tech => (
                      <span key={tech} className="hidden md:inline-block px-4 py-3 bg-gray-800/80 border border-gray-600 rounded text-white text-sm backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
            <button
                onClick={(e) => { e.preventDefault(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full text-white hover:scale-125 transition-all opacity-50 hover:opacity-100"
            >
                <ChevronLeft size={40} />
            </button>
            <button
                onClick={(e) => { e.preventDefault(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full text-white hover:scale-125 transition-all opacity-50 hover:opacity-100"
            >
                <ChevronRight size={40} />
            </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 right-8 z-20 flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-6' : 'bg-gray-500 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;