import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryTiles = ({ categories }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [needsScrolling, setNeedsScrolling] = useState(false);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = current.clientWidth * 0.8;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Check if scrolling is needed
  useEffect(() => {
    const checkScrolling = () => {
      if (rowRef.current) {
        const { scrollWidth, clientWidth } = rowRef.current;
        setNeedsScrolling(scrollWidth > clientWidth + 20); // Small buffer for rounding
      }
    };

    // Small delay to ensure DOM is rendered
    const timeoutId = setTimeout(checkScrolling, 100);
    window.addEventListener('resize', checkScrolling);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkScrolling);
    };
  }, [categories]);

  return (
    <div className="mb-12 relative group px-0 md:px-0">
      
      <div className="relative">
        {/* Left Arrow - Only on mobile when scrolling is needed */}
        {needsScrolling && (
          <div 
            className={`flex md:hidden absolute left-0 top-0 bottom-0 w-12 z-40 bg-gradient-to-r from-[#1a1d29] to-transparent items-center justify-center transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <button 
              onClick={() => scroll('left')}
              className="p-1 hover:text-white text-gray-300 hover:scale-125 transition-transform"
            >
              <ChevronLeft size={40} />
            </button>
          </div>
        )}

        {/* Scroll Container */}
        <div 
          ref={rowRef}
          onScroll={handleScroll}
          className={`flex overflow-x-auto px-4 md:px-12 py-8 gap-4 no-scrollbar scroll-smooth items-center ${!needsScrolling ? 'justify-center' : ''}`}
        >
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex-none w-[35vw] sm:w-[28vw] md:w-[20vw] lg:w-[16vw] transition-all duration-300"
            >
              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-800 shadow-lg hover:shadow-[0_40px_58px_-16px_rgba(0,0,0,0.8)] border-[3px] border-[rgba(249,249,249,0.1)] md:group-hover:border-[#00b4d8]/40 hover:!border-[#00b4d8] transition-all duration-300 hover:scale-105 relative">
                {category.bannerImage ? (
                  <img
                    src={category.bannerImage}
                    alt={category.title}
                    className="absolute w-full h-full object-contain bg-gray-800 opacity-80 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 p-2">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg text-center leading-tight tracking-wide">{category.title}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
          {/* Padding to ensure last item is fully visible */}
          {needsScrolling && <div className="w-4 md:w-12 flex-none" />}
        </div>

        {/* Right Arrow - Only on mobile when scrolling is needed */}
        {needsScrolling && (
          <div 
            className={`flex md:hidden absolute right-0 top-0 bottom-0 w-12 z-40 bg-gradient-to-l from-[#1a1d29] to-transparent items-center justify-center transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <button 
              onClick={() => scroll('right')}
              className="p-1 hover:text-white text-gray-300 hover:scale-125 transition-transform"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTiles;