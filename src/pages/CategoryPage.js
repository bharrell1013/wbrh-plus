// pages/CategoryPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectTile from '../components/ProjectTile';

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Mock data for different categories
  const categoryData = {
    'react': {
      title: 'React Projects',
      bannerImage: '/api/placeholder/1920/400',
      description: 'Interactive web applications built with React',
      projects: [
        {
          id: 'react-1',
          title: 'E-commerce Dashboard',
          image: '/api/placeholder/400/225',
          year: '2024',
          description: 'Full-featured admin dashboard'
        },
        {
          id: 'react-2',
          title: 'Social Media App',
          image: '/api/placeholder/400/225',
          year: '2023',
          description: 'Real-time messaging platform'
        },
        {
          id: 'react-3',
          title: 'Portfolio Generator',
          image: '/api/placeholder/400/225',
          year: '2023',
          description: 'Dynamic portfolio builder'
        }
        // Add more React projects...
      ]
    },
    'native': {
      title: 'React Native Projects',
      bannerImage: '/api/placeholder/1920/400',
      description: 'Mobile applications developed with React Native',
      projects: [
        {
          id: 'native-1',
          title: 'Fitness Tracker',
          image: '/api/placeholder/400/225',
          year: '2024',
          description: 'Health monitoring app'
        },
        {
          id: 'native-2',
          title: 'Recipe Book',
          image: '/api/placeholder/400/225',
          year: '2023',
          description: 'Cooking companion app'
        }
        // Add more React Native projects...
      ]
    },
    'film': {
      title: 'Film Projects',
      bannerImage: '/api/placeholder/1920/400',
      description: 'Video production and editing work',
      projects: [
        {
          id: 'film-1',
          title: 'Short Film: "The Loop"',
          image: '/api/placeholder/400/225',
          year: '2024',
          description: 'Sci-fi short film'
        },
        {
          id: 'film-2',
          title: 'Music Video',
          image: '/api/placeholder/400/225',
          year: '2023',
          description: 'Visual music experience'
        }
        // Add more film projects...
      ]
    }
  };

  const category = categoryData[categoryId] || {
    title: 'Category Not Found',
    bannerImage: '/api/placeholder/1920/400',
    description: 'This category does not exist',
    projects: []
  };

  return (
    <div className="min-h-screen bg-[#0F1014]">
      {/* Category Banner */}
      <div className="relative h-[40vh] w-full">
        <img 
          src={category.bannerImage}
          alt={category.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1014] via-[#0F1014]/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{category.title}</h1>
            <p className="text-gray-300 text-lg">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {category.projects.map(project => (
            <div key={project.id} className="group transition-transform hover:scale-105">
              <ProjectTile
                project={{
                  ...project,
                  image: project.image
                }}
              />
              <div className="mt-2">
                <h3 className="text-white font-medium text-sm truncate">
                  {project.title}
                </h3>
                <div className="text-gray-400 text-xs">
                  {project.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {category.projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              No projects found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;