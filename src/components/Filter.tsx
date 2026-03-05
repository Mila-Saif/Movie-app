"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import NProgress from "nprogress"; 

export default function GenreFilter({ genres }: { genres: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentGenre = searchParams.get("genre");

  const handleGenreClick = (genreId: string | null) => {
    NProgress.start();
    const params = new URLSearchParams(searchParams.toString());
    
    if (genreId) {
      params.set("genre", genreId); 
    } else {
      params.delete("genre"); 
    }
    
    params.delete("page"); 
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative w-full">
     
      <div className="flex overflow-x-auto gap-3 pb-4 pt-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
       
        <Button
          variant={!currentGenre ? "default" : "secondary"}
          className="rounded-full shrink-0 snap-start"
          onClick={() => handleGenreClick(null)}
        >
          Trending
        </Button>

       
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={currentGenre === genre.id.toString() ? "default" : "secondary"}
            className="rounded-full shrink-0 snap-start"
            onClick={() => handleGenreClick(genre.id.toString())}
          >
            {genre.name}
          </Button>
        ))}
      </div>
    </div>
  );
}