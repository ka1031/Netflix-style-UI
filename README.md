# Movie Discovery Platform

A full-stack movie discovery web app built with React, Node.js/Express, and PostgreSQL. Users can sign up, log in, browse trending movies, search the full TMDB catalog, view movie details, and maintain a personal watchlist — all behind JWT-secured, user-scoped API endpoints.

## Features

- **Authentication** — signup/login with bcrypt password hashing and JWT-based sessions
- **Protected routes** — both frontend (route guards) and backend (middleware) enforce authenticated access
- **Trending movies** — homepage pulls live trending data from TMDB
- **Search** — full-catalog search proxied through the backend
- **Movie details** — dedicated page per movie with overview, genres, runtime, rating, and cast
- **Watchlist** — add/remove movies, persisted per-user in PostgreSQL
- **User data isolation** — every user only ever sees their own watchlist data

## Tech Stack

**Frontend:** React, React Router, vanilla CSS
**Backend:** Node.js, Express, JWT, bcrypt
**Database:** PostgreSQL (`pg`)
**External API:** TMDB (The Movie Database)

## Project Structure

```
frontend/
  src/
    App.jsx                  # route definitions
    Navbar.jsx / header.jsx   # navigation, search bar, logout
    Home.jsx                 # banner section
    TitleCards.jsx           # trending movies row
    SearchResults.jsx        # search results grid
    MovieDetail.jsx          # single movie detail page
    MyList.jsx               # user's watchlist page
    ProtectedRoute.jsx        # route guard using localStorage token
    form.jsx / signup.jsx     # login & signup forms
    hooks/useWatchlist.js     # shared watchlist state + API calls
    assets/cards/cards_data.js # trending fetch helper (calls backend, not TMDB directly)
    styles/                   # per-component CSS

backend/
  server.js                  # entry point
  app.js                     # Express app + route mounting
  db.js                      # PostgreSQL connection pool
  middleware/
    authMiddleware.js        # JWT verification
  routes/
    authRoutes.js            # /auth/signup, /auth/login
    userRoutes.js            # /users/me
    movieRoutes.js            # /movies/trending, /movies/search, /movies/:id
    watchlistRoutes.js        # /watchlist (GET/POST/DELETE)
  controllers/
    authController.js
    movieController.js        # TMDB proxy layer
    watchlistController.js
```

## Database Schema

| Table | Purpose | Status |
|---|---|---|
| `users` | account credentials | ✅ in use |
| `watchlist` | per-user saved movies | ✅ in use |
| `ratings` | per-user movie ratings | 🚧 planned |
| `watch_history` | per-user viewing history | 🚧 planned |
| `user_preferences` | per-user genre/content preferences | 🚧 planned |

## API Endpoints

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/auth/signup` | No | Create account |
| POST | `/auth/login` | No | Log in, returns JWT |
| GET | `/users/me` | Yes | Get current user info |
| GET | `/movies/trending` | No | Trending movies (TMDB proxy) |
| GET | `/movies/search?query=` | No | Search movies (TMDB proxy) |
| GET | `/movies/:id` | No | Movie details + cast (TMDB proxy) |
| GET | `/watchlist` | Yes | Get current user's watchlist |
| POST | `/watchlist` | Yes | Add movie to watchlist |
| DELETE | `/watchlist/:tmdb_id` | Yes | Remove movie from watchlist |

## Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
DATABASE_URL=postgres://user:password@localhost:5432/your_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
TMDB_API_KEY=your_tmdb_api_key
```

Run the schema against your PostgreSQL database (see `db/schema.sql` if present, or your existing tables), then:

```bash
node server.js
```

Backend runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on Vite's default dev port (typically `http://localhost:5173`).

## Known Limitations / Roadmap

This project is under active development. Current gaps:

- No refresh tokens — JWT simply expires, requiring re-login
- No rate limiting or input validation/sanitization on backend routes
- CORS is fully open (`cors()` with no config) — fine for local dev, not for production
- `ratings`, `watch_history`, and `user_preferences` tables exist but have no API routes yet
- No TV show support despite `media_type` field supporting it
- No automated tests

Planned next: ratings, watch history, and preference-based recommendations.

## License

Personal/educational project.