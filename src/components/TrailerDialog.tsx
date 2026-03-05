"use client";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function TrailerDialog({ trailerKey }: { trailerKey: string }) {
  if (!trailerKey) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="mt-6 gap-2 font-semibold">
          <Play className="w-5 h-5 fill-current" />
          Watch Trailer
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden">
        
        <DialogTitle className="sr-only">Movie Trailer</DialogTitle>
        
   
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}