// pages/CategoryPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryByDocId, getProjects } from '../firebaseUtils';
import ProjectTile from '../components/ProjectTile';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Attempting to fetch category with ID:', categoryId);
        
        // Fetch category details using the document ID
        const categoryData = await getCategoryByDocId(categoryId);
        console.log('Retrieved category data:', categoryData);
        setCategory(categoryData);

        // Fetch projects for this category
        const projectsData = await getProjects(categoryId);
        console.log('Retrieved projects:', projectsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1014] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-[#0F1014] flex items-center justify-center">
        <div className="text-white">Category not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1014]">
      {/* Category Banner */}
      <div className="relative h-[40vh] w-full">
        {category.bannerImage && (
          <img 
            src={category.bannerImage}
            alt={category.title}
            className="w-full h-full object-cover"
          />
        )}
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
          {projects.map(project => (
            <div key={project.id} className="group transition-transform hover:scale-105">
              <ProjectTile project={project} />
              <div className="mt-2">
                <h3 className="text-white font-medium text-sm truncate">
                  {project.title}
                </h3>
                {project.createdAt && (
                  <div className="text-gray-400 text-xs">
                    {new Date(project.createdAt).getFullYear()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
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