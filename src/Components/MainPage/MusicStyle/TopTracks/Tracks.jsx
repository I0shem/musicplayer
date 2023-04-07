import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import s from "./Tracks.module.css";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { PlaySong } from "./../../../../redux/Actions";
import LeftWindow from "./../../../LeftWindow/LeftWindow/LeftWindow";
import { useLocation } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import { IconContext } from "react-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
const KEY = process.env.REACT_APP_SEARCH_KEY;

const Tracks = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[800],
      },
    },
  });

  const location = useLocation();
  const getMusicDB = useCallback(() => {
    axios({
      method: "GET",
      url: `https://api.napster.com/v2.2/genres/${location.state.ms.id}/tracks/top?apikey=${KEY}`,
    })
      .then((response) => {
        return setMusicDB(response.data.tracks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    getMusicDB();
  }, []);

  const [genreTracks, setMusicDB] = useState([]);

  const [page, setPage] = useState(1);
  const [countElement] = useState(8);
  const lastMusicIndex = page * countElement;
  const firstMusicIndex = lastMusicIndex - countElement;
  const currentMusic = genreTracks.slice(firstMusicIndex, lastMusicIndex);
  const pagesCount = Math.ceil(genreTracks.length / countElement);

  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    console.log(genreTracks);
  }, [genreTracks]);

  const HandlePlayClick = (m) => {
    const img =
      "https://api.napster.com/imageserver/v2/albums/" +
      m.albumId +
      "/images/500x500.jpg";
    let NewSong = {
      name: m.name,
      artistName: m.artistName,
      albumName: m.albumName,
      previewURL: m.previewURL,
      imageSrc: img,
    };
    dispatch(PlaySong(NewSong));
  };

  return (
    <>
      <LeftWindow />
      <div className={s.RightWindow}>
        <h3 className={s.Text}>{location.state.ms.name} - Top tracks</h3>
        <div>
          <div className={s.MusicData}>
            {currentMusic.map((m) => {
              return (
                <div key={m.id} className={s.TrackBox}>
                  <div className={s.PlayButton}>
                    <IconContext.Provider
                      value={{ size: "100px", className: s.playBtn }}
                    >
                      <CiPlay1 onClick={() => HandlePlayClick(m)} />
                    </IconContext.Provider>
                  </div>
                  <img
                    className={s.AlbumImage}
                    src={
                      "https://api.napster.com/imageserver/v2/albums/" +
                      m.albumId +
                      "/images/500x500.jpg"
                    }
                    alt=""
                  />
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

export default Tracks;
