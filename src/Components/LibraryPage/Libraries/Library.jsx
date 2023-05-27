import React, { useState } from "react";
import s from "./Library.module.css";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { PlaySong, DeleteFromPlaylist } from "./../../../redux/Actions";
import { IoPlayOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as Sprite } from "../../Icons/bin.svg";

const Library = () => {
  let state = useParams();
  const list = useSelector((state) => state.Playlist).playlists;
  let [tracks] = useState([]);
  let index = 0;
  list.map((playlist, i) => {
    if (playlist.name === state.id) {
      tracks = playlist.tracks;
      index = i;
    }
    return null;
  });

  const [page, setPage] = useState(1);
  const [countElement] = useState(8);
  const lastMusicIndex = page * countElement;
  const firstMusicIndex = lastMusicIndex - countElement;
  const currentMusic = tracks.slice(firstMusicIndex, lastMusicIndex);
  const pagesCount = Math.ceil(tracks.length / countElement);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();
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
  let deleteFromList = (m) => {
    dispatch(DeleteFromPlaylist(m.id, index));
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
            className: s.backBtn,
          }}
        >
          <IoIosArrowRoundBack onClick={returnTo} />
        </IconContext.Provider>
        <h3 className={s.Text}>Library: {state.id} - Tracks</h3>
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
                  <div onClick={() => deleteFromList(m)}>
                    <Link href="" className={s.link}>
                      <Sprite
                        fill="white"
                        stroke="white"
                        className={s.Remove}
                      />
                    </Link>
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
                classes={{ selected: s.selected }}
                sx={{
                  ".Mui-selected": {
                    backgroundColor: "rgba(70, 70, 70, 0.8)",
                    color: "white",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className={s.rectangle}></div>
      </div>
    </>
  );
};

export default Library;
