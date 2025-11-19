import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryTiles from '../components/CategoryTiles';
import CategoryRow from '../components/CategoryRow';
import { getProjects, getCategories } from '../firebaseUtils';
import { localProjects, localCategories } from '../data/localProjects';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsByCategory, setProjectsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories from Firebase
        const firebaseCategories = await getCategories();
        
        // Merge categories: Local first (Professional), then Firebase (reverse chronological or existing order)
        // Ensure we don't have duplicates if ids collide (though unlikely here)
        const allCategories = [...localCategories, ...firebaseCategories.reverse()];
        setCategories(allCategories);

        // Fetch projects from Firebase
        const firebaseProjects = await getProjects();
        
        // Merge projects
        const allProjects = [...localProjects, ...firebaseProjects];
        
        // Set featured projects
        // Randomize projects from both professional and personal (not just featured)
        const professionalProjects = localProjects.filter(p => p.categoryId === 'professional');
        const personalProjects = allProjects.filter(p => p.categoryId !== 'professional');
        
        // Get some from each category (prioritize featured, but include others if needed)
        const featuredProfessional = professionalProjects.filter(p => p.featured);
        const featuredPersonal = personalProjects.filter(p => p.featured);
        
        // If we don't have enough featured, supplement with non-featured
        let professionalPool = featuredProfessional.length >= 2 
          ? featuredProfessional 
          : [...featuredProfessional, ...professionalProjects.filter(p => !p.featured)].slice(0, 3);
        
        let personalPool = featuredPersonal.length >= 1
          ? featuredPersonal
          : [...featuredPersonal, ...personalProjects.filter(p => !p.featured)].slice(0, 3);
        
        // Combine pools
        const allPool = [...professionalPool, ...personalPool];
        
        // Fisher-Yates Shuffle for randomization
        const shuffled = [...allPool];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Take first 3, ensuring mix from both categories
        let finalFeatured = [];
        if (shuffled.length >= 3) {
          // Try to get at least 1 from each category
          const professionalInShuffled = shuffled.filter(p => p.categoryId === 'professional');
          const personalInShuffled = shuffled.filter(p => p.categoryId !== 'professional');
          
          if (professionalInShuffled.length > 0 && personalInShuffled.length > 0) {
            // Mix: 1-2 from professional, 1-2 from personal
            const proCount = Math.min(2, professionalInShuffled.length);
            const perCount = 3 - proCount;
            finalFeatured = [
              ...professionalInShuffled.slice(0, proCount),
              ...personalInShuffled.slice(0, perCount)
            ];
            // Shuffle the mix
            for (let i = finalFeatured.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [finalFeatured[i], finalFeatured[j]] = [finalFeatured[j], finalFeatured[i]];
            }
          } else {
            finalFeatured = shuffled.slice(0, 3);
          }
        } else {
          finalFeatured = shuffled;
        }
        
        setFeaturedProjects(finalFeatured);

        // Group projects by category
        const projectsMap = {};
        
        // 1. Professional Experience (Explicitly Local)
        projectsMap['professional'] = localProjects.filter(p => p.categoryId === 'professional');

        // 2. Personal Projects (Group everything else)
        // Reuse personalProjects already calculated above
        projectsMap['personal'] = personalProjects;

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="pt-16">
        {/* Hero Slider */}
        <HeroSlider projects={featuredProjects} />
        
        {/* Category Tiles */}
        <CategoryTiles categories={categories} />
        
        {/* Project Rows by Category */}
        <div className="space-y-8">
          {/* Professional Experience */}
          {projectsByCategory['professional']?.length > 0 && (
            <div id="professional-experience">
              <CategoryRow 
                title="Professional Experience"
                projects={projectsByCategory['professional']}
              />
            </div>
          )}

          {/* Personal Projects */}
          {projectsByCategory['personal']?.length > 0 && (
            <div id="personal-projects">
              <CategoryRow 
                title="Personal Projects"
                projects={projectsByCategory['personal']}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;