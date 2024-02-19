import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import s from "./Tracks.module.css";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  PlaySong,
  AddLikedSong,
  DeleteLikedSong,
} from "./../../../../redux/Actions";
import { useLocation } from "react-router-dom";
import { IoPlayOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import AddToList from "../../../ModalAddToList/AddToList";
import NotFound from "../../../Images/not-found.jpg";
const KEY = process.env.REACT_APP_SEARCH_KEY;

const Tracks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const getMusicDB = useCallback(() => {
    axios({
      method: "GET",
      url: `https://napi-v2-2-cloud-run-b3gtd5nmxq-uw.a.run.app/v2.2/genres/${location.state.ms.id}/tracks/top?apikey=${KEY}`,
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
  }, [location.state.ms.id]);

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
  const LikedList = useSelector((state) => state.Playlist).playlists[0].tracks;

  let urlsLikedList = LikedList.map((a) => a.previewURL);
  const CheckLiked = (m) => {
    if (urlsLikedList.includes(m.previewURL)) {
      return (
        <div className={s.LikeButton}>
          <IconContext.Provider value={{ size: "50px", className: s.playBtn }}>
            <AiFillHeart onClick={() => HandleDislike(m)} />
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
  const navigate = useNavigate();
  const returnTo = () => {
    navigate(-1);
  };
  const [track, setTrack] = useState();
  const addTrackToList = (m) => {
    setTrack(m);
    setIsOpen(true);
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
        <h3 className={s.Text}>{location.state.ms.name} - Top tracks</h3>
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
                  {CheckLiked(m)}
                  <div className={s.AddButton}>
                    <IconContext.Provider
                      value={{ size: "50px", className: s.playBtn }}
                    >
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

export default Tracks;
