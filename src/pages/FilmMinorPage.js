import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const YouTubeEmbed = ({ videoId, isHero = false }) => (
  <div className={`w-full ${isHero ? 'h-full' : 'aspect-video'}`}>
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

const FilmMinorPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilm, setCurrentFilm] = useState(0);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const filmsRef = collection(db, 'films');
        const snapshot = await getDocs(filmsRef);
        const filmsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFilms(filmsData);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/);
    return match && match[1];
  };

  const nextFilm = () => setCurrentFilm((prev) => (prev + 1) % films.length);
  const prevFilm = () => setCurrentFilm((prev) => (prev - 1 + films.length) % films.length);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1014] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const currentFilmData = films[currentFilm];

  return (
    <div className="min-h-screen bg-[#0F1014] pt-16">
      {/* Hero Section with Video */}
      <div className="relative h-[calc(100vh-64px)]">
        {/* Video Container */}
        <div className="absolute inset-0">
          {currentFilmData && (
            <YouTubeEmbed 
              videoId={getYouTubeId(currentFilmData.youtubeUrl)} 
              isHero={true} 
            />
          )}
        </div>

        {/* Text Content Container - Positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          {/* Gradient Background for Text */}
          <div className="absolute inset-0 h-80 bg-gradient-to-t from-[#0F1014] to-transparent" />
          
          {/* Content */}
          <div className="relative p-8 max-w-3xl">
            {currentFilmData && (
              <>
                <h1 className="text-5xl font-bold text-white mb-4">
                  {currentFilmData.title}
                </h1>
                <p className="text-gray-300 text-lg mb-4">
                  {currentFilmData.date}
                </p>
                <p className="text-gray-200 text-lg mb-8">
                  {currentFilmData.description}
                </p>
                <div className="prose prose-invert">
                  <h2 className="text-2xl font-bold text-white mb-4">Behind the Scenes</h2>
                  <p className="text-gray-300">
                    {currentFilmData.behindTheScenes}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevFilm}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          ←
        </button>
        <button
          onClick={nextFilm}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          →
        </button>
      </div>

      {/* Film Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">All Films</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((film, index) => (
            <div
              key={film.id}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setCurrentFilm(index)}
            >
              <YouTubeEmbed videoId={getYouTubeId(film.youtubeUrl)} />
              <div className="p-4">
                <h3 className="text-white font-medium text-lg mb-2">{film.title}</h3>
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