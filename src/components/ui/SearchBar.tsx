"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-secondary/50 focus-within:ring-primary"
      />
      <Button type="submit" variant="default" className="hover:bg-red-500">
        <Search className="h-4 w-4 " />
        
      </Button>
    </form>
  );
}