'use client';

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorPage({ params }) {
  const [director, setDirector] = useState(null);

  // Get all data (movies + directors) from the API using SWR
  const { data, error } = useSWR('/api/moviesData', fetcher);

  useEffect(() => {
    if (data) {
      const movie = data.movies.find((m) => m.id === params.id);
      const foundDirector = data.directors.find((d) => d.id === movie?.directorId);
      setDirector(foundDirector);
    }
  }, [data, params.id]);

  if (error) return <p className="text-center text-red-500">Failed to load</p>;
  if (!data || !director) return <p className="text-center text-gray-500">Loading...</p>;

  const directedMovies = data.movies.filter((m) => m.directorId === director.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{director.name}</h1>
      <p className="text-gray-700 mb-6">{director.biography}</p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎬 Other Movies by {director.name}</h2>
      <ul className="space-y-4">
        {directedMovies.map((movie) => (
          <li key={movie.id} className="border p-4 rounded-md shadow bg-white">
            <Link href={`/movies/${movie.id}`} className="text-lg font-medium text-blue-600 hover:underline">
              {movie.title}
            </Link>
            <p className="text-sm text-gray-600">
              Year: {movie.releaseYear} | Rating: ⭐ {movie.rating}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <Link href={`/movies/${params.id}`} className="text-blue-600 hover:underline">
          ← Back to Movie
        </Link>
      </div>
    </div>
  );
}
