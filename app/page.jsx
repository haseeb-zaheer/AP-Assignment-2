'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const router = useRouter();

  const clickHandler = () => {
    router.push('/genres');
  };

  useEffect(() => {
    axios.get('/api/moviesData')
      .then(res => {
        const allMovies = res.data.movies;
        const trending = allMovies.filter(movie => movie.rating >= 8.5);
        setMovies(allMovies);
        setTrendingMovies(trending);
      })
      .catch(err => {
        console.error("Failed to fetch movies:", err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Trending Movies</h1>

      <ul className="space-y-6 mb-10">
        {trendingMovies.map((movie) => (
          <li key={movie.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{movie.title}</h2>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              <span className="font-medium">Year:</span> {movie.releaseYear} | 
              <span className="font-medium ml-2">Rating:</span> {movie.rating}
            </p>
            <p className="text-gray-700">{movie.description}</p>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button
          onClick={clickHandler}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Go to Genres Page
        </button>
      </div>
    </div>
  );
}
