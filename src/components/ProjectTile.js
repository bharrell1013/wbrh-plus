import React from 'react';
import { Link } from 'react-router-dom';

const ProjectTile = ({ project }) => {
  return (
    <Link 
      to={`/project/${project.id}`}
      className="flex-shrink-0 w-48 transition-transform hover:scale-105"
    >
      <div className="rounded-lg overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-28 object-cover"
        />
      </div>
    </Link>
  );
};

export default ProjectTile;