import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import s from "./SearchPage.module.css";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { PlaySong, AddLikedSong, DeleteLikedSong } from "../../redux/Actions";
import { IoPlayOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import AddToList from "../ModalAddToList/AddToList";
import NotFound from "../Images/not-found.jpg";
const SEARCH_KEY = process.env.REACT_APP_SEARCH_KEY;

const SearchPage = () => {
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
  const HandleDislike = (m) => {
    dispatch(DeleteLikedSong(m.id));
  };
  const CheckLiked = (m) => {
    if (urlsLikedList.includes(m.previewURL)) {
      return (
        <div className={s.LikeButton}>
          <IconContext.Provider value={{ className: s.likeBtn }}>
            <AiFillHeart onClick={() => HandleDislike(m)} />
          </IconContext.Provider>
        </div>
      );
    } else {
      return (
        <div className={s.LikeButton}>
          <IconContext.Provider value={{ className: s.likeBtn }}>
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

  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState();
  const addTrackToList = (m) => {
    setTrack(m);
    setIsOpen(true);
  };

  return (
    <>
      <div className={s.RightWindow}>
        <div className={s.backBox}>
          <IconContext.Provider
            value={{
              className: s.backBtn,
            }}
          >
            <IoIosArrowRoundBack onClick={returnTo} />
          </IconContext.Provider>
          <h3 className={s.Text}>Search</h3>
        </div>
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

              <IconContext.Provider
                value={{
                  className: s.clearIcon,
                }}
              >
                <RxCross2 onClick={Clear} />
              </IconContext.Provider>
            </form>
          </div>

          <div className={s.MusicData}>
            {currentMusic.map((m) => {
              return (
                <div key={m.id} className={s.TrackBox}>
                  <div className={s.PlayButton}>
                    <IconContext.Provider value={{ className: s.playBtn }}>
                      <IoPlayOutline onClick={() => HandlePlayClick(m)} />
                    </IconContext.Provider>
                  </div>
                  {CheckLiked(m)}
                  <div className={s.AddButton}>
                    <IconContext.Provider value={{ className: s.addToListBtn }}>
                      <BiAddToQueue onClick={() => addTrackToList(m)} />
                    </IconContext.Provider>
                  </div>
                  <img
                    loading="lazy"
                    className={s.AlbumImage}
                    src={
                      "https://api.napster.com/imageserver/v2/albums/" +
                      m.albumId +
                      "/images/500x500.jpg"
                    }
                    alt="File not found"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = NotFound; // Replace with default image
                    }}
                  />
                  <div className={s.ImageOverlay}>
                    <h5>
                      "
                      {m.name.length > 45
                        ? `${m.name.slice(0, 42)}...`
                        : m.name}
                      "
                    </h5>
                    <h6>
                      {" "}
                      by{" "}
                      {m.artistName.length > 45
                        ? `${m.artistName.slice(0, 42)}...`
                        : m.artistName}
                    </h6>
                    <h6>
                      Album:{" "}
                      {m.albumName.length > 45
                        ? `${m.albumName.slice(0, 42)}...`
                        : m.albumName}
                    </h6>
                  </div>
                </div>
              );
            })}
            <div className={s.PaginationBox}>
              <Pagination
                count={pagesCount}
                page={page}
                showFirstButton
                showLastButton
                onChange={handleChange}
                className={s.Pagination}
                sx={{
                  ".Mui-selected": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className={s.rectangle}></div>
        {isOpen && (
          <>
            <AddToList setIsOpen={setIsOpen} song={track} />
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
