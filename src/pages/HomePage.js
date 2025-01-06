import React from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryRow from '../components/CategoryRow';

const HomePage = () => {
  const categories = [
    {
      title: "React Projects",
      projects: [
        { id: 1, title: "Project 1", image: "/api/placeholder/200/150" },
        // Add more projects
      ]
    },
    // Add more categories
  ];

  return (
    <div className="pt-16">
      <HeroSlider />
      {categories.map(category => (
        <CategoryRow 
          key={category.title}
          title={category.title}
          projects={category.projects}
        />
      ))}
    </div>
  );
};

export default HomePage;