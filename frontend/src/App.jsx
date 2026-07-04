import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import TitleCards from "./TitleCards";
import Header from "./header";
import Form from "./form";
import Signup from "./signup";
import MyList from "./MyList";
import ProtectedRoute from "./ProtectedRoute";
import SearchResults from "./SearchResults"; // add import
import MovieDetail from "./MovieDetail"; // add import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/signup"
          element={
            <div className="sign_up_page">
              <Header />
              <Signup />
            </div>
          }
        />

        <Route
          path="/login"
          element={
            <div className="login_page">
              <Header />
              <Form />
            </div>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <div className="home_page">
                <Navbar />
                <Home />
                <TitleCards />
              </div>
            </ProtectedRoute>
          }
        />
        {/* NEW: My List page */}
        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <div className="home_page">
                <Navbar />
                <MyList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <div className="home_page">
                <Navbar />
                <SearchResults />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <div className="home_page">
                <Navbar />
                <MovieDetail />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;