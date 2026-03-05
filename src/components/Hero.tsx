"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi, 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {  Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export default function Hero({ movies }: { movies: any[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const heroMovies = movies.slice(0, 3);

  
  useEffect(() => {
    if (!api) return;

   
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative group">
      <Carousel
        setApi={setApi} 
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full"
      >
        <CarouselContent>
          {heroMovies.map((movie) => (
            <CarouselItem key={movie.id}>
              <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden rounded-3xl">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span>• {new Date(movie.release_date).getFullYear()}</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                    {movie.title}
                  </h1>

                  <p className="text-lg text-gray-300 line-clamp-2 md:line-clamp-3 max-w-xl">
                    {movie.overview}
                  </p>

                  <div className="flex items-center gap-4 pt-6">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                      
                      Details
                    </Button>
                    
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

   
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)} 
              className={`h-1.5 transition-all duration-300 rounded-full ${
                current === index 
                  ? "w-6 bg-white" 
                  : "w-2 bg-white/30 hover:bg-white/50" 
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}