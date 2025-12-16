const API_KEY = 'fd10d705578f498918f69606ffa5593a';

const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

export const fetchPopularMovies = async () => {
  const res = await fetch(
    `${BASE_URL}?api_key=${API_KEY}`
  );
  const data = await res.json();

  return data.results.map(movie => ({
    image: `${IMAGE_BASE_URL}${movie.poster_path}`,
    name: movie.title
  }));
};
