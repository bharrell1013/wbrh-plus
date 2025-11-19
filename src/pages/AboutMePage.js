import React from 'react';

const AboutMePage = () => {
  const skills = [
    { 
      category: 'Languages', 
      items: ['Java', 'JavaScript', 'C#', 'C++', 'C', 'Python', 'SQL'] 
    },
    { 
      category: 'Frameworks & Libraries', 
      items: ['React', 'React Native', 'ASP.NET MVC 5', '.NET MAUI', 'Kendo UI', 'jQuery', 'Tailwind CSS'] 
    },
    { 
      category: 'Tools & DevOps', 
      items: ['Git', 'Azure DevOps', 'Webpack', 'Gulp', 'Babel', 'Figma', 'Visual Studio'] 
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-12">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gradient-to-b from-[#090b13] to-[#1a1d29]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">About Me</h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-8 -mt-20 relative z-10">
        {/* Bio Section */}
        <div className="bg-[#1e2129] rounded-xl p-8 shadow-xl mb-12 border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-6">Hello, World!</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            I'm Bailey Harrell, a Fullstack Software Engineer at D.R. Horton. My journey in technology has been marked by a unique blend of academic excellence, hands-on development experience, and a creative approach to problem-solving.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            My recent work involves transforming legacy systems into modern React applications, architecting .NET MAUI mobile solutions, 
            and improving user experiences for thousands of homebuyers. I thrive in environments that challenge me to bridge the gap 
            between complex backend logic and intuitive frontend design.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Beyond code, I have a minor in Film and Video Studies, which fuels my appreciation for visual storytelling and user experience. 
            Whether it's directing a short film or architecting a user flow, I believe in crafting experiences that resonate with people.
          </p>
        </div>

        {/* Skills Bubbles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map(({ category, items }) => (
              <div key={category} className="bg-[#1e2129] rounded-xl p-6 shadow-lg border border-gray-800 hover:border-gray-600 transition-colors">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-200 border border-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1e2129] rounded-xl p-8 shadow-lg border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-4">Education</h3>
            <div className="text-gray-300 space-y-3">
              <p className="font-bold text-xl text-blue-400">Purdue University</p>
              <p className="text-lg">B.S. Computer Science</p>
              <p className="text-sm text-gray-400">Class of 2025 • GPA: 3.53</p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="font-medium text-white">Tracks</p>
                <p className="text-sm">Software Engineering & Algorithmic Foundations</p>
                <p className="font-medium text-white mt-2">Minor</p>
                <p className="text-sm">Film and Video Studies</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1e2129] rounded-xl p-8 shadow-lg border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-4">Achievements</h3>
            <div className="text-gray-300">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-3 text-yellow-500">★</span>
                  <span>Eagle Scout</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-yellow-500">★</span>
                  <span>MIT App Inventor App of the Month (2x Winner)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-yellow-500">★</span>
                  <span>Certificate in Collaborative Leadership</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;