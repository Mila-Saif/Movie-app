import { getMovies } from "@/lib/tmdb";

export default async function Home() {
  let movies = [];

  try {
    const data = await getMovies("/trending/movie/day");
    movies = data.results || []; 
  } catch (error) {
    console.error("Fetch failed:", error);
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Trending Movies</h1>
      
      {movies.length === 0 ? (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          No movies found today.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie: any) => (
            <div key={movie.id} className="border p-2 rounded-lg shadow-sm">
              <p className="font-semibold">{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}