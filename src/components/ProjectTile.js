import React from 'react';
import { Link } from 'react-router-dom';

const ProjectTile = ({ project }) => {
  // Special handling for projects that need contain fit (logos, etc.)
  const needsContain = project.imageFit === 'contain' || 
                       project.id === 'wbrh-plus' || 
                       project.title?.toLowerCase().includes('wbrh');

  return (
    <Link 
      to={`/project/${project.id}`}
      className="block relative w-full transition-all duration-300 ease-in-out z-10 hover:z-20 hover:scale-105"
    >
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-[#1e2129] shadow-lg hover:shadow-[0_40px_58px_-16px_rgba(0,0,0,0.8)] border-[3px] border-[rgba(249,249,249,0.1)] md:group-hover:border-[#00b4d8]/40 hover:!border-[#00b4d8] transition-all duration-300">
        <div className="relative w-full h-full aspect-[16/9] rounded-lg overflow-hidden">
          <img 
            src={project.imageUrl || "/api/placeholder/400/225"} 
            alt={project.title}
            className={`absolute w-full h-full ${needsContain ? 'object-contain' : 'object-cover'}`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300 z-10">
            <h3 className="text-white font-bold text-xs md:text-sm line-clamp-2 leading-tight mb-0 break-words">{project.title}</h3>
            {project.technologies && (
              <div className="hidden md:flex flex-wrap gap-1.5 mt-2">
                {project.technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[11px] font-bold text-white bg-gray-700/80 px-2 py-0.5 rounded border border-gray-500/50 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectTile;