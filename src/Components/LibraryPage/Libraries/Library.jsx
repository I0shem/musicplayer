import React, { useState } from "react";
import s from "./Library.module.css";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { PlaySong } from "./../../../redux/Actions";
import { useLocation } from "react-router-dom";
import { IoPlayOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[800],
      },
    },
  });
  const location = useLocation();
  const library = location.state.lib;
  const tracks = library.tracks;

  const [page, setPage] = useState(1);
  const [countElement] = useState(8);
  const lastMusicIndex = page * countElement;
  const firstMusicIndex = lastMusicIndex - countElement;
  const currentMusic = tracks.slice(firstMusicIndex, lastMusicIndex);
  const pagesCount = Math.ceil(tracks.length / countElement);

  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    setPage(value);
  };

  const HandlePlayClick = (m) => {
    let NewSong = {
      name: m.name,
      artistName: m.artistName,
      albumName: m.albumName,
      previewURL: m.previewURL,
      imageSrc: m.imageSrc,
    };
    dispatch(PlaySong(NewSong));
    var visualAudio = document.getElementById("Visualizer");
    visualAudio.style.display = "none";
  };

  const navigate = useNavigate();
  const returnTo = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={s.RightWindow}>
        <IconContext.Provider
          value={{
            size: "70px",
            className: s.backBtn,
          }}
        >
          <IoIosArrowRoundBack onClick={returnTo} />
        </IconContext.Provider>
        <h3 className={s.Text}>Library: {location.state.lib.name} - Tracks</h3>
        <div>
          <div className={s.MusicData}>
            {currentMusic.map((m) => {
              return (
                <div key={m.id} className={s.TrackBox}>
                  <div className={s.PlayButton}>
                    <IconContext.Provider
                      value={{ size: "50px", className: s.playBtn }}
                    >
                      <IoPlayOutline onClick={() => HandlePlayClick(m)} />
                    </IconContext.Provider>
                  </div>
                  <img className={s.AlbumImage} src={m.imageSrc} alt="" />
                  <div className={s.ImageOverlay}>
                    <h5>"{m.name}"</h5>
                    <h6> by {m.artistName}</h6>
                    <h6>Album: {m.albumName}</h6>
                  </div>
                </div>
              );
            })}
            <div className={s.PaginationBox}>
              <ThemeProvider theme={theme}>
                <Pagination
                  count={pagesCount}
                  page={page}
                  showFirstButton
                  showLastButton
                  color="primary"
                  sx={{ button: { color: "#ffffff" } }}
                  onChange={handleChange}
                  className={s.Pagination}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
        <div className={s.rectangle}></div>
      </div>
    </>
  );
};

export default Library;
