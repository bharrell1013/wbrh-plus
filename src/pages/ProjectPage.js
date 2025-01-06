// pages/ProjectPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Tab components
const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-lg ${
      active 
        ? 'text-white border-b-2 border-white font-medium' 
        : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const ProjectPage = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('images');

  // Mock project data - replace with your actual data
  const project = {
    title: "Project Name",
    subtitle: "React • TypeScript • 2024",
    description: "A comprehensive description of the project and its key features. This showcases the main functionality and technical achievements.",
    image: "/api/placeholder/1200/600",
    tags: ["HD", "React", "TypeScript"],
    images: [
      {
        id: 1,
        title: "Homepage Design",
        thumbnail: "/api/placeholder/300/200",
        description: "The main landing page featuring responsive design"
      },
      {
        id: 2,
        title: "Dashboard View",
        thumbnail: "/api/placeholder/300/200",
        description: "Interactive dashboard with real-time data"
      }
    ],
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    features: [
      "Responsive Design",
      "Real-time Updates",
      "Authentication System",
      "Data Visualization"
    ],
    links: {
      github: "https://github.com/username/project",
      live: "https://project-demo.com"
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1014] pt-16">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1014] via-transparent to-transparent" />
        </div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-gray-300 text-lg mb-4">{project.subtitle}</p>
            <div className="flex space-x-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-800 rounded-sm text-sm text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-200 text-lg mb-8">{project.description}</p>
            <div className="flex space-x-4">
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-black rounded hover:bg-gray-200 transition-colors"
              >
                VIEW LIVE
              </a>
              <a 
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              >
                GITHUB
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex space-x-6">
            <TabButton 
              active={activeTab === 'images'} 
              onClick={() => setActiveTab('images')}
            >
              IMAGES
            </TabButton>
            <TabButton 
              active={activeTab === 'suggested'} 
              onClick={() => setActiveTab('suggested')}
            >
              SUGGESTED
            </TabButton>
            <TabButton 
              active={activeTab === 'details'} 
              onClick={() => setActiveTab('details')}
            >
              DETAILS
            </TabButton>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'images' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map(image => (
              <div key={image.id} className="bg-gray-900 rounded-lg overflow-hidden">
                <img 
                  src={image.thumbnail} 
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2">{image.title}</h3>
                  <p className="text-gray-400 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="text-white">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-gray-800 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="list-disc pl-5 space-y-2">
                {project.features.map(feature => (
                  <li key={feature} className="text-gray-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'suggested' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Add suggested projects here */}
            <div className="text-gray-400">Similar projects will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;