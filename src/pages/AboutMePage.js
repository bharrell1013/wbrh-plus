import React from "react";

const AboutMePage = () => {
  const skills = [
    {
      category: "Languages",
      items: ["Java", "JavaScript", "C#", "C++", "C", "Python", "SQL"],
    },
    {
      category: "Frameworks & Libraries",
      items: [
        "React",
        "React Native",
        "ASP.NET MVC 5",
        ".NET MAUI",
        "Kendo UI",
        "jQuery",
        "Tailwind CSS",
      ],
    },
    {
      category: "Tools & DevOps",
      items: [
        "Git",
        "Azure DevOps",
        "Webpack",
        "Gulp",
        "Babel",
        "Figma",
        "Visual Studio",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-12 bg-[#1a1d29]">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gradient-to-b from-[#090b13] to-[#1a1d29]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
              About Me
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>
        </div>
        {/* Background Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-8 -mt-20 relative z-10">
        {/* Bio Section */}
        <div className="bg-[#1e2129]/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl mb-12 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">
            Hello, World!
          </h2>

          <p className="text-gray-200 text-lg leading-relaxed mb-6 drop-shadow-sm">
            I’m{" "}
            <span className="font-semibold text-blue-400">Bailey Harrell</span>,
            a Fullstack Software Engineer at D.R. Horton. I like building things
            that feel thoughtful, polished, and alive. Whether I’m refactoring
            legacy code into a modern React app or shaping out a .NET MAUI
            feature from scratch, what keeps me hooked is the{" "}
            <span className="text-blue-400 font-semibold">
              creative problem-solving
            </span>
            . I want the things I build to look good, feel good, and make sense.
          </p>

          <p className="text-gray-200 text-lg leading-relaxed mb-6 drop-shadow-sm">
            My background in Film and Video Studies still shows up in my work.
            It taught me to think about pacing, clarity, and emotion — ideas
            that end up shaping the way I design interfaces and structure code.
            A good user experience has the same rhythm as a{" "}
            <span className="text-blue-400 font-semibold">
              well-edited scene
            </span>
            .
          </p>

          <p className="text-gray-200 text-lg leading-relaxed drop-shadow-sm">
            When I’m not coding, I’m usually playing story-driven games,
            watching movies, or tinkering with whatever idea catches my
            attention. I like exploring creative projects just to see where they
            lead, and that same curiosity follows me into everything I build.
          </p>
        </div>

        {/* Skills Bubbles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map(({ category, items }) => (
              <div
                key={category}
                className="bg-[#1e2129]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-800/80 rounded-full text-sm text-gray-200 border border-gray-700 group-hover:border-blue-500/30 transition-colors shadow-sm"
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
          <div className="bg-[#1e2129]/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-md">
              Education
            </h3>
            <div className="text-gray-300 space-y-3">
              <p className="font-bold text-xl text-blue-400">
                Purdue University
              </p>
              <p className="text-lg text-gray-200">B.S. Computer Science</p>
              <p className="text-sm text-gray-400">Class of 2025 • GPA: 3.53</p>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <p className="font-medium text-white">Tracks</p>
                <p className="text-sm text-gray-300">
                  Software Engineering & Algorithmic Foundations
                </p>
                <p className="font-medium text-white mt-2">Minor</p>
                <p className="text-sm text-gray-300">Film and Video Studies</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1e2129]/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-md">
              Achievements
            </h3>
            <div className="text-gray-300">
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <span className="mr-3 text-yellow-500 group-hover:scale-110 transition-transform duration-200">
                    ★
                  </span>
                  <span className="text-gray-200">Eagle Scout</span>
                </li>
                <li className="flex items-start group">
                  <span className="mr-3 text-yellow-500 group-hover:scale-110 transition-transform duration-200">
                    ★
                  </span>
                  <span className="text-gray-200">
                    MIT App Inventor App of the Month (2x Winner)
                  </span>
                </li>
                <li className="flex items-start group">
                  <span className="mr-3 text-yellow-500 group-hover:scale-110 transition-transform duration-200">
                    ★
                  </span>
                  <span className="text-gray-200">
                    Certificate in Collaborative Leadership
                  </span>
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
