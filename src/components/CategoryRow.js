import React from 'react';
import ProjectTile from './ProjectTile';

const CategoryRow = ({ title, projects }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl text-white font-semibold mb-4 px-8">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto px-8">
        {projects.map(project => (
          <ProjectTile key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;