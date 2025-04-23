import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/api/moviesData');
  const data = await res.json();

  return data.movies.map((movie) => ({
    id: movie.id,
  }));
}

export default async function MovieDetailsPage({ params }) {
  const res = await fetch('http://localhost:3000/api/moviesData', {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const data = await res.json();
  const movie = data.movies.find((m) => m.id === params.id);

  if (!movie) return notFound();

  const director = data.directors.find((d) => d.id === movie.directorId);
  const genre = data.genres.find((g) => g.id === movie.genreId);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{movie.title}</h1>
      
      <p className="text-gray-600 mb-2"><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p className="text-gray-600 mb-2"><strong>Rating:</strong> ⭐ {movie.rating}</p>
      <p className="text-gray-600 mb-2">
        <strong>Genre:</strong> {genre?.name || 'Unknown'}
      </p>
      <p className="text-gray-600 mb-4">
      <Link href={`/movies/${movie.id}/director`} className="text-blue-600 hover:underline">
        {director?.name || 'Unknown'}
      </Link>
      </p>

      <p className="text-gray-800">{movie.description}</p>

    </div>
  );
}
