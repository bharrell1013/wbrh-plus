import React, { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="relative w-full h-full">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const FilmMinorPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilm, setCurrentFilm] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const filmsRef = collection(db, "films");
        const snapshot = await getDocs(filmsRef);
        const filmsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFilms(filmsData);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const getYouTubeId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/
    );
    return match && match[1];
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0F1014] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );

  const currentFilmData = films[currentFilm];

  return (
    <div className="min-h-screen bg-[#0F1014] pt-16">
      {/* Hero Section Container */}
      <div
        className="relative w-full h-[60vh] bg-gray-900"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Base Video Layer */}
        <div className="absolute inset-0">
          {currentFilmData && (
            <YouTubeEmbed videoId={getYouTubeId(currentFilmData.youtubeUrl)} />
          )}
        </div>

        {/* Content Overlay - Using CSS grid for precise positioning */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovering ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1014] via-[#0F1014]/50 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
            {currentFilmData && (
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {currentFilmData.title}
                </h1>
                <p className="text-gray-300 text-base mb-2">
                  {currentFilmData.date}
                </p>
                <p className="text-gray-200 text-base mb-4">
                  {currentFilmData.description}
                </p>
                <div className="prose prose-invert">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Behind the Scenes
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {currentFilmData.behindTheScenes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls - Now with proper event handling */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentFilm(
                (prev) => (prev - 1 + films.length) % films.length
              );
            }}
            className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            onMouseEnter={(e) => e.stopPropagation()}
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentFilm((prev) => (prev + 1) % films.length);
            }}
            className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            onMouseEnter={(e) => e.stopPropagation()}
          >
            →
          </button>
        </div>
      </div>

      {/* Film Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">All Films</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((film, index) => (
            <div
              key={film.id}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 group"
              onClick={() => setCurrentFilm(index)}
            >
              <div className="aspect-video relative">
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeId(
                    film.youtubeUrl
                  )}/hqdefault.jpg`}
                  alt={film.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium text-lg mb-2">
                  {film.title}
                </h3>
                <p className="text-gray-400 text-sm">{film.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmMinorPage;
