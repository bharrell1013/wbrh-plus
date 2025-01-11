import React from 'react';
import { Link } from 'react-router-dom';

const ProjectTile = ({ project }) => {
  return (
    <Link 
      to={`/project/${project.id}`}
      className="block group relative aspect-video rounded-lg overflow-hidden bg-gray-900"
    >
      <img 
        src={project.imageUrl || "/api/placeholder/400/225"} 
        alt={project.title}
        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
        <h3 className="text-white font-medium text-lg">{project.title}</h3>
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies.slice(0, 3).map(tech => (
              <span key={tech} className="text-xs text-white/80">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectTile;