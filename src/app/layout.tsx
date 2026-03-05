import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchBar from "@/components/ui/SearchBar";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Search App",
  description: "Find your favorite movies",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextTopLoader
          color="#e11d48"         
          initialPosition={0.08}  
          crawlSpeed={200}      
          height={3}              
          crawl={true}            
          showSpinner={false}     
          easing="ease"
          speed={200}
          shadow="0 0 10px #e11d48,0 0 5px #e11d48" 
        />
        <header className="w-full border-b border-border bg-background/95 py-4">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" className="text-2xl font-extrabold text-primary tracking-wider uppercase">
            MovieHub
          </a>
          
          <div className="w-full md:w-auto">
            <SearchBar />
              </div>
      </div>
    </header>

        <main className="container mx-auto px-4 md:px-8 py-8 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}