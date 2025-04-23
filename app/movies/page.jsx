import Link from "next/link";

export const dynamic = 'force-static'; 

// as we didnt use 'use-client', Next automatically statically
// generates the page


// This page will be statically generated and revalidated every 60 seconds
export default async function MoviesPage() {

  // since i used appRouter, appRouter does not have getStaticProps but instead 
  // usees this to implement ISR and SSG
  const res = await fetch('http://localhost:3000/api/moviesData', {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  const movies = data.movies;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">🎬 Movies List</h1>

      <ul className="space-y-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="p-6 bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition"
          >
            <Link href = {`/movies/${movie.id}`}>
            <h2 className="text-xl font-semibold text-gray-800">{movie.title}</h2>
            <p className="text-sm text-gray-600 mt-1 mb-3">
              <span className="font-medium">Year:</span> {movie.releaseYear} | 
              <span className="ml-2 font-medium">Rating:</span> ⭐ {movie.rating}
            </p>
            <p className="text-gray-700">{movie.description}</p>
            </Link>
          </li>
          
        ))}
      </ul>
    </div>
  );
}

