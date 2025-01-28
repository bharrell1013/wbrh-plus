import React from 'react';

const AboutMePage = () => {
  const skills = [
    { 
      category: 'Languages', 
      items: ['Java', 'JavaScript', 'C', 'C++', 'C#', 'Python'] 
    },
    { 
      category: 'Technologies', 
      items: ['React', 'React Native', 'SQL', 'Firebase', 'ASP.NET'] 
    },
    { 
      category: 'Tools & Methods', 
      items: ['Git', 'Agile/Scrum', 'Vim', 'Figma', 'Expo', 'Visual Studio'] 
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1014] pt-16">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gradient-to-b from-gray-900 to-[#0F1014]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">About Me</h1>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Bio Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Hello, World!</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            I'm Bailey Harrell, a senior Computer Science student at Purdue University with a passion for software engineering and movies. My journey in technology has been marked by a unique blend of academic excellence, hands-on development experience, and a creative approach to problem-solving.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            From developing enterprise applications at D.R. Horton to creating and leading coding camps for youth, I've consistently sought opportunities to grow while helping others. I believe in the power of technology to make a positive impact, whether it's through building efficient software solutions or inspiring the next generation of developers.
          </p>
        </div>

        {/* Skills Bubbles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map(({ category, items }) => (
              <div key={category} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white"
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
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
            <div className="text-gray-300">
              <p className="font-medium">Purdue University</p>
              <p className="text-sm mb-2">Computer Science, Class of 2025 - GPA: 3.53</p>
              <p className="text-sm">Tracks: Software Engineering & Algorithmic Foundations</p>
              <p className="text-sm">Minor: Film and Video Studies</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
            <div className="text-gray-300">
              <ul className="space-y-2">
                <li>Certificate in Collaborative Leadership</li>
                <li>MIT App Inventor App of the Month (2x Winner)</li>
                <li>Eagle Scout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;