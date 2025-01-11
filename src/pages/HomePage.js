import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryTiles from '../components/CategoryTiles';
import CategoryRow from '../components/CategoryRow';
import { getProjects, getCategories } from '../firebaseUtils';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsByCategory, setProjectsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await getCategories();
        categoriesData.reverse(); // Reverse order to show latest first
        setCategories(categoriesData);

        // Fetch all projects
        const allProjects = await getProjects();
        
        // Set featured projects (those marked as featured or first 5)
        const featured = allProjects.filter(p => p.featured).slice(0, 5);
        setFeaturedProjects(featured.length ? featured : allProjects.slice(0, 5));

        // Group remaining projects by category
        const projectsMap = {};
        categoriesData.forEach(category => {
          projectsMap[category.id] = allProjects.filter(
            project => project.categoryId === category.id
          );
        });
        
        setProjectsByCategory(projectsMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1014] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1014]">
      <div className="pt-16">
        {/* Hero Slider */}
        <HeroSlider projects={featuredProjects} />
        
        {/* Category Tiles */}
        <CategoryTiles categories={categories} />
        
        {/* Project Rows by Category */}
        <div className="space-y-12 pb-12">
          {categories.map(category => (
            <CategoryRow 
              key={category.id}
              title={category.title}
              projects={projectsByCategory[category.id] || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;