import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import s from "./ArtistTracks.module.css";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { PlaySong, AddLikedSong } from "../../../../redux/Actions";
import { useLocation } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const KEY = process.env.REACT_APP_SEARCH_KEY;

const ArtistTracks = () => {
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
      url: `https://napi-v2-2-cloud-run-b3gtd5nmxq-uw.a.run.app/v2.2/artists/${location.state.fav.id}/tracks/top?apikey=${KEY}`,
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

  const [artistTracks, setMusicDB] = useState([]);

  const [page, setPage] = useState(1);
  const [countElement] = useState(8);
  const lastMusicIndex = page * countElement;
  const firstMusicIndex = lastMusicIndex - countElement;
  const currentMusic = artistTracks.slice(firstMusicIndex, lastMusicIndex);
  const pagesCount = Math.ceil(artistTracks.length / countElement);

  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    setPage(value);
  };

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
    var visualAudio = document.getElementById("Visualizer");
    visualAudio.style.display = "none";
  };

  const navigate = useNavigate();
  const returnToMain = () => {
    navigate("/m");
  };

  const LikedList = useSelector((state) => state.Playlist).playlists[0].tracks;
  let urlsLikedList = LikedList.map((a) => a.previewURL);

  const HandleLike = (m) => {
    const img =
      "https://api.napster.com/imageserver/v2/albums/" +
      m.albumId +
      "/images/500x500.jpg";
    let LikedSong = {
      id: m.id,
      name: m.name,
      artistName: m.artistName,
      albumName: m.albumName,
      previewURL: m.previewURL,
      imageSrc: img,
    };
    dispatch(AddLikedSong(LikedSong));
  };

  const CheckLiked = (m) => {
    if (urlsLikedList.includes(m.previewURL)) {
      return (
        <div className={s.LikeButton}>
          <IconContext.Provider value={{ size: "50px", className: s.playBtn }}>
            <AiFillHeart />
          </IconContext.Provider>
        </div>
      );
    } else {
      return (
        <div className={s.LikeButton}>
          <IconContext.Provider value={{ size: "50px", className: s.playBtn }}>
            <AiOutlineHeart onClick={() => HandleLike(m)} />
          </IconContext.Provider>
        </div>
      );
    }
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
          <IoIosArrowRoundBack onClick={returnToMain} />
        </IconContext.Provider>
        <h3 className={s.Text}>{location.state.fav.name} - Top tracks</h3>
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
                  {CheckLiked(m)}
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

export default ArtistTracks;
