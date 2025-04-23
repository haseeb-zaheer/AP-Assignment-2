import { redirect } from 'next/navigation';

export default async function GenresPage({ searchParams }) {
  const selectedGenreId = searchParams?.genreId ?? null;

  const res = await fetch('http://localhost:3000/api/moviesData', {
    cache: 'no-store', // this forces SSR, like getServerSideProps
  });

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();
  const { genres, movies } = data;

  const filteredMovies = selectedGenreId
    ? movies.filter((movie) => movie.genreId === selectedGenreId)
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Browse Genres</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {genres.map((genre) => {
          const isActive = selectedGenreId === genre.id;

          const url = new URLSearchParams({ genreId: genre.id }).toString();

          return (
            <a
              key={genre.id}
              href={`/genres?${url}`}
              className={`block text-center p-4 rounded border transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border-gray-300 text-blue-600 hover:bg-gray-50'
              }`}
            >
              {genre.name}
            </a>
          );
        })}
      </div>

      {selectedGenreId && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🎬 Movies in Selected Genre
          </h2>

          {filteredMovies?.length > 0 ? (
            <ul className="space-y-5">
              {filteredMovies.map((movie) => (
                <li
                  key={movie.id}
                  className="p-4 bg-white border border-gray-200 rounded shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-medium text-gray-900">{movie.title}</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Year:</strong> {movie.releaseYear} | <strong>Rating:</strong> ⭐ {movie.rating}
                  </p>
                  <p className="text-gray-700 mt-1">{movie.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No movies found in this genre.</p>
          )}
        </>
      )}
    </div>
  );
}
