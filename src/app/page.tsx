import { getMovies } from "@/lib/tmdb";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react"; 
import Hero from "@/components/Hero";
import Link from "next/link";
import { Button } from  "@/components/ui/button"


export default async function Home() {
  const data = await getMovies("/trending/movie/day");
  const popularData = await getMovies("/movie/popular")
  const movies = data.results || [];
  const popularMovies = popularData.results || [];

  return (
    <div className="space-y-8">
      <Hero movies={popularMovies} />

      <section className="space-y-6">
        <h2 className="text-lg md:text-2xl font-bold tracking-tight text-foreground">
        Trending Movies
        
      </h2>
    
      
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie: any) => {
          const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
          
          const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

          return (
            <Card 
              key={movie.id} 
              className="group overflow-hidden border-0 bg-secondary/20 hover:bg-secondary/40 transition-colors duration-300 cursor-pointer"
            >
              {/* image posters */}
              <div className="relative aspect-2/3 overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  {rating}
                </div>
              </div>

             
              <CardContent className="p-4 space-y-1">
                <h3 className="font-semibold truncate text-foreground" title={movie.title}>
                  {movie.title}
                </h3>
                <p className="text-sm pb-0.5 text-muted-foreground">
                  {year}
                </p>

                <div className="p-4 pt-0">

                  <Link href={`/movie/${movie.id}`} className="w-full mt-auto block">
                    <Button variant="outline" className="w-full hover:bg-primary ghover:text-primary-foreground transition-colors">
                      Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
        
      </section>
      
    </div>
  );
}