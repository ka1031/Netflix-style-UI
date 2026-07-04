const API = "http://localhost:5000";
export const fetchPopularMovies = async () => {
  try {
    const res = await fetch(`${API}/movies/trending`);
    const data = await res.json();
    return data.success ? data.movies : [];
  } catch (err) {
    console.error("fetchPopularMovies error:", err);
    return [];
  }
};
