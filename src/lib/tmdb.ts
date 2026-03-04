const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function getMovies(endpoint: string) {
  const token = process.env.TMDB_TOKEN; 

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} ${response.statusText}`);
    return { results: [] }; 
  }

  return response.json();
}