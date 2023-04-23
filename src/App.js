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

const App = () => {
  const [MyTheme, setMyTheme] = useState("dark");

  const changeTheme = () => {
    setMyTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <div title="Music Player" className={style.App}>
        <div class="wrapper">
          <input type="checkbox" id="hide-checkbox" onClick={changeTheme} />
          <label for="hide-checkbox" class="toggle">
            <span class="toggle-button">
              <span class="crater crater-1"></span>
              <span class="crater crater-2"></span>
              <span class="crater crater-3"></span>
              <span class="crater crater-4"></span>
              <span class="crater crater-5"></span>
              <span class="crater crater-6"></span>
              <span class="crater crater-7"></span>
            </span>
            <span class="star star-1"></span>
            <span class="star star-2"></span>
            <span class="star star-3"></span>
            <span class="star star-4"></span>
            <span class="star star-5"></span>
            <span class="star star-6"></span>
            <span class="star star-7"></span>
            <span class="star star-8"></span>
          </label>
        </div>

        <div className="Container">
          <ThemeContext.Provider value={{ changeTheme }}>
            <div id={MyTheme}>
              <LeftWindow />
              <Routes>
                <Route path="/m" element={<HomePage />} />
                <Route path="/m/SearchPage" element={<SearchPage />} />
                <Route path="/m/LibraryPage" element={<LibraryPage />} />{" "}
                <Route path="/m/Tracks" element={<Tracks />} />
                <Route path="/m/LibraryPage/Library" element={<Library />} />
                <Route path="/m/ArtistTracks" element={<ArtistTracks />} />
                <Route
                  path="/m/FeaturedPlaylist"
                  element={<FeaturedPlaylist />}
                />
              </Routes>
            </div>
          </ThemeContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
