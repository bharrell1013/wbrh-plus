// pages/ProjectPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectRef = doc(db, 'projects', projectId);
        const projectSnap = await getDoc(projectRef);
        
        if (projectSnap.exists()) {
          const projectData = {
            id: projectSnap.id,
            ...projectSnap.data(),
            createdAt: projectSnap.data().createdAt?.toDate()
          };
          console.log('Fetched project:', projectData);
          setProject(projectData);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Error loading project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Helper function to check if an image is a GIF
  const isGif = (url) => {
    if (!url) return false;
    return url.toLowerCase().endsWith('.gif');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1014] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0F1014] flex items-center justify-center">
        <div className="text-white">{error || 'Project not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1014] pt-16">
      {/* Hero Section */}
      <div className="relative w-full" style={{ height: "calc(100vh - 64px)" }}>
        <div className="absolute inset-0 bg-gray-900">
          <img 
            src={project.imageUrl || "/api/placeholder/1200/600"}
            alt={project.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1014] via-transparent to-transparent" />
        </div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-gray-300 text-lg mb-4">
              {[...project.technologies || []].join(' • ')} • {project.createdAt?.getFullYear()}
            </p>
            <div className="flex flex-wrap space-x-2 mb-6">
              {project.technologies?.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-800 rounded-sm text-sm text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-200 text-lg mb-8">{project.description}</p>
            <div className="flex space-x-4">
              {project.links?.live && (
                <a 
                  href={project.links.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white text-black rounded hover:bg-gray-200 transition-colors"
                >
                  VIEW LIVE
                </a>
              )}
              {project.links?.github && (
                <a 
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  GITHUB
                </a>
              )}
              {project.downloadUrl && (
                <a 
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-indigo-700 text-white rounded hover:bg-indigo-600 transition-colors"
                >
                  DOWNLOAD
                </a>
              )}
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
            {project.images?.map((image, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-[16/9] relative">
                  {isGif(image.url) ? (
                    // GIF handling
                    <img 
                      src={image.url}
                      alt={image.title || `Project image ${index + 1}`}
                      className="absolute w-full h-full object-contain bg-gray-900"
                    />
                  ) : (
                    // Regular image handling
                    <img 
                      src={image.url || "/api/placeholder/300/200"}
                      alt={image.title || `Project image ${index + 1}`}
                      className="absolute w-full h-full object-contain bg-gray-900"
                    />
                  )}
                </div>
                {(image.title || image.description) && (
                  <div className="p-4">
                    {image.title && (
                      <h3 className="text-white font-medium mb-2">{image.title}</h3>
                    )}
                    {image.description && (
                      <p className="text-gray-400 text-sm">{image.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
            {(!project.images || project.images.length === 0) && (
              <div className="text-gray-400">No images available</div>
            )}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="text-white">
            {project.downloadUrl && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Download</h2>
                <p className="text-gray-300 mb-3">
                  Download the project files to run locally on your machine.
                </p>
                <a 
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-600 transition-colors"
                >
                  Download ZIP
                </a>
              </div>
            )}
            {project.technologies && project.technologies.length > 0 && (
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
            )}
            {project.features && project.features.length > 0 && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;