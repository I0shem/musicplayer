import "./App.css";
import style from "./App.module.css";
import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Components/MainPage/MainPage";
import SearchPage from "./Components/SearchPage/SearchPage";
import LibraryPage from "./Components/LibraryPage/LibraryPage";
import Library from "./Components/LibraryPage/Libraries/Library";
import { ThemeContext } from "./ThemeContext";
import Tracks from "./Components/MainPage/MusicStyle/TopTracks/Tracks";
import LeftWindow from "./Components/LeftWindow/LeftWindow/LeftWindow";
import ArtistTracks from "./Components/MainPage/Favorite/ArtistTracks/ArtistTracks";
import FeaturedPlaylist from "./Components/MainPage/Playlists/FeaturedPlaylistTracks/FeaturedTracks";
import LoginWindow from "./Components/Authentication/LoginWindow/LoginWindow";
import { useSelector } from "react-redux";
const App = () => {
  const [MyTheme, setMyTheme] = useState("dark");

  const changeTheme = () => {
    setMyTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };
  const isLoggedIn = useSelector((state) => state.User).isLoggedIn;

  return (
    <BrowserRouter>
      <main>
        <div title="Music Player" className={style.App}>
          <div className="wrapper">
            <input type="checkbox" id="hide-checkbox" onClick={changeTheme} />
            <label htmlFor="hide-checkbox" className="toggle">
              <span className="toggle-button">
                <span className="crater crater-1"></span>
                <span className="crater crater-2"></span>
                <span className="crater crater-3"></span>
                <span className="crater crater-4"></span>
                <span className="crater crater-5"></span>
                <span className="crater crater-6"></span>
                <span className="crater crater-7"></span>
              </span>
              <span className="star star-1"></span>
              <span className="star star-2"></span>
              <span className="star star-3"></span>
              <span className="star star-4"></span>
              <span className="star star-5"></span>
              <span className="star star-6"></span>
              <span className="star star-7"></span>
              <span className="star star-8"></span>
            </label>
          </div>

          <div className="Container">
            <ThemeContext.Provider value={{ changeTheme }}>
              <div id={MyTheme}>
                <LeftWindow />
                <Routes>
                  <Route path="/musicplayer" element={<HomePage />} />
                  <Route
                    path="/musicplayer/SearchPage"
                    element={<SearchPage />}
                  />
                  <Route
                    path="/musicplayer/LibraryPage"
                    element={<LibraryPage />}
                  />
                  <Route path="/musicplayer/Tracks/:id" element={<Tracks />} />
                  <Route
                    path="/musicplayer/LibraryPage/Library/:id"
                    element={<Library />}
                  />
                  <Route
                    path="/musicplayer/ArtistTracks/:id"
                    element={<ArtistTracks />}
                  />
                  <Route
                    path="/musicplayer/FeaturedPlaylist/:id"
                    element={<FeaturedPlaylist />}
                  />
                </Routes>
              </div>
            </ThemeContext.Provider>
          </div>
        </div>
      </main>
      {isLoggedIn === true ? "" : <LoginWindow />}
    </BrowserRouter>
  );
};

export default App;
