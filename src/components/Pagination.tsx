"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NProgress from "nprogress"; 

export default function PaginationControls({ 
  currentPage, 
  totalPages 
}: { 
  currentPage: number; 
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    NProgress.start(); 
    
    const params = new URLSearchParams(searchParams.toString());
    
    params.set("page", newPage.toString());
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const maxPages = Math.min(totalPages, 500);

  return (
    <div className="flex items-center justify-center gap-4 pt-12 pb-8">
      <Button
        variant="outline"
        size="lg"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4 " />
      
      </Button>
      
      <span className="text-sm font-medium text-muted-foreground">
        Page {currentPage} of {maxPages}
      </span>
      
      <Button
        variant="outline"
        size="lg"
        disabled={currentPage >= maxPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
       
        <ChevronRight className="w-4 h-4 " />
      </Button>
    </div>
  );
}