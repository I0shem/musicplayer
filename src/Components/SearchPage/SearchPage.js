import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import s from "./SearchPage.module.css";
import clr from "../Icons/cross.svg";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { PlaySong, AddLikedSong } from "./../../redux/Actions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { IoPlayOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
const SEARCH_KEY = process.env.REACT_APP_SEARCH_KEY;

const SearchPage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[800],
      },
    },
  });

  const LikedList = useSelector((state) => state.Playlist).playlists[0].tracks;

  let urlsLikedList = LikedList.map((a) => a.previewURL);

  const [musicDB, setMusicDB] = useState([]);
  const [value, setValue] = useState("");

  const Clear = () => {
    setValue("");
    setMusicDB([]);
  };
  const getMusicDB = useCallback(
    (options) => {
      if (value) {
        // check if value exists or not
        axios(options)
          .then((response) => {
            setMusicDB(response.data.search.data.tracks);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    [value]
  );

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.napster.com/v2.2/search/verbose?apikey=${SEARCH_KEY}&query=${value}`,
    };
    const timer = setTimeout(() => {
      getMusicDB(options);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value, getMusicDB]);

  const onChangeValue = (value) => {
    setValue(value.target.value);
  };

  //Pagination MUI
  const [page, setPage] = useState(1);
  const [countElement] = useState(8);
  const lastMusicIndex = page * countElement;
  const firstImageIndex = lastMusicIndex - countElement;
  const currentMusic = musicDB.slice(firstImageIndex, lastMusicIndex);
  const pagesCount = Math.ceil(musicDB.length / countElement);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const dispatch = useDispatch();
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
          <IconContext.Provider value={{ size: "50px" }}>
            <AiFillHeart />
          </IconContext.Provider>
        </div>
      );
    } else {
      return (
        <div className={s.LikeButton}>
          <IconContext.Provider value={{ size: "50px" }}>
            <AiOutlineHeart onClick={() => HandleLike(m)} />
          </IconContext.Provider>
        </div>
      );
    }
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
        <h3 className={s.Text}>Search</h3>
        <div>
          <div className={s.SearchBar}>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <input
                className={s.Search}
                type="text"
                placeholder="Songs, Artists, Podcasts..."
                value={value}
                onChange={(e) => onChangeValue(e)}
              />
              <img src={clr} alt="" className={s.searchIcon} onClick={Clear} />
            </form>
          </div>

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
                  {CheckLiked(m)}
                  <div className={s.AddButton}>
                    <IconContext.Provider
                      value={{ size: "50px", className: s.playBtn }}
                    >
                      <BiAddToQueue onClick="" />
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

export default SearchPage;
