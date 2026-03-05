import { getMovies } from "@/lib/tmdb";
import { Star, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TrailerDialog from "@/components/TrailerDialog"; // Import our new component

export default async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const movie = await getMovies(`/movie/${id}?append_to_response=videos`);

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

  const trailer = movie.videos?.results?.find(
    (vid: any) => vid.site === "YouTube" && vid.type === "Trailer"
  );

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[40vh] md:h-[60vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="w-64 shrink-0 mx-auto md:mx-0 shadow-2xl rounded-xl overflow-hidden border-4 border-background">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col justify-end pb-4 space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                {movie.title}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  {rating}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {year}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {movie.runtime} min
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {movie.genres?.map((genre: any) => (
                <Badge key={genre.id} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="max-w-2xl text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {movie.overview}
              </p>
              
              <TrailerDialog trailerKey={trailer?.key} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}