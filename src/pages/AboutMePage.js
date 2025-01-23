import React from 'react';

const AboutMePage = () => {
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Firebase'] },
    { category: 'Tools', items: ['Git', 'Docker', 'VS Code'] },
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
          <p className="text-gray-300 text-lg leading-relaxed">
            [Your introduction will go here. This should be a compelling narrative about 
            your journey, passions, and what drives you in technology and film.]
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
              <p className="font-medium">[Your University]</p>
              <p className="text-sm">[Your Degree] - [Year]</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Interests</h3>
            <div className="text-gray-300">
              <p>[Your interests and hobbies will go here]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;