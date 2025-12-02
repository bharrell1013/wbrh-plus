import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectTile from "./ProjectTile";

const CategoryRow = ({ title, projects }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Don't show arrows if we have 4 or fewer items
  const hasArrows = projects.length > 4;

  const scroll = (direction) => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = current.clientWidth * 0.8; // Scroll 80% of view width

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  return (
    <div className="mb-8 relative group">
      <h2 className="text-xl text-[#f9f9f9] font-bold mb-3 px-4 md:px-12">
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow - Visible on Hover & Desktop */}
        {hasArrows && (
          <div
            className={`hidden md:flex absolute left-0 top-0 bottom-0 w-12 z-40 bg-gradient-to-r from-[#1a1d29] to-transparent items-center justify-center transition-opacity duration-300 ${
              showLeftArrow
                ? "opacity-0 group-hover:opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => scroll("left")}
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
          className="flex overflow-x-auto px-4 md:px-12 py-8 gap-4 no-scrollbar scroll-smooth items-start"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-none w-[60vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw] transition-all duration-300 p-1"
            >
              <ProjectTile project={project} />
            </div>
          ))}
          {/* Padding to ensure last item is fully visible */}
          <div className="w-4 md:w-12 flex-none" />
        </div>

        {/* Right Arrow */}
        {hasArrows && (
          <div
            className={`hidden md:flex absolute right-0 top-0 bottom-0 w-12 z-40 bg-gradient-to-l from-[#1a1d29] to-transparent items-center justify-center transition-opacity duration-300 ${
              showRightArrow
                ? "opacity-0 group-hover:opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => scroll("right")}
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

export default CategoryRow;
