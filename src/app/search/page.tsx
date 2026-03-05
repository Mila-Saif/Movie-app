import { getMovies } from "@/lib/tmdb";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;

//   error 1

  if (!q) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-foreground">Please enter a search term</h1>
        <p className="text-muted-foreground mt-2">Use the search bar in the header to find movies.</p>
      </div>
    );
  }

  const data = await getMovies(`/search/movie?query=${encodeURIComponent(q)}&include_adult=false`);
  const movies = data.results || [];

  return (
    <div className="space-y-8 pb-20">
      <h2 className="text-lg md:text-2xl font-bold tracking-tight text-foreground">
        Search Results for "{q}"
      </h2>
      
      {/* error 2 */}
      {movies.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-xl text-muted-foreground">No movies found matching "{q}".</p>
        </div>
      ) : (
       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie: any) => {
            const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
            const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

            return (
              <Card 
                key={movie.id} 
                className="group overflow-hidden border-0 bg-secondary/20 hover:bg-secondary/40 transition-colors duration-300 flex flex-col"
              >
                
                <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                  
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                      No Image
                    </div>
                  )}
                  
                  
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {rating}
                  </div>
                </div>

                
                <CardContent className="p-4 space-y-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-semibold truncate text-foreground" title={movie.title}>
                      {movie.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {year}
                    </p>
                  </div>

                  <Link href={`/movie/${movie.id}`} className="w-full mt-auto block">
                    <Button variant="outline" className="w-full hover:bg-primary ghover:text-primary-foreground transition-colors">
                      Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}