// pages/HomePage.js
import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryRow from '../components/CategoryRow';
import { getProjects, getCategories } from '../firebaseUtils';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [projectsByCategory, setProjectsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all categories
        const categoriesData = await getCategories();
        console.log('Categories:', categoriesData); // Debug log
        setCategories(categoriesData);

        // Fetch all projects
        const allProjects = await getProjects();
        console.log('Projects:', allProjects); // Debug log

        // Group projects by category
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
    <div className="pt-16">
      <HeroSlider projects={Object.values(projectsByCategory)
        .flat()
        .filter(project => project.featured)} />
      
      {categories.map(category => (
        <CategoryRow 
          key={category.id}
          title={category.title}
          projects={projectsByCategory[category.id] || []}
        />
      ))}
    </div>
  );
};

export default HomePage;