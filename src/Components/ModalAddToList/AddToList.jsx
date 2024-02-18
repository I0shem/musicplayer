import React from "react";
import s from "./AddToList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AddToPlaylist } from "../../redux/Actions";
import { BsCheck } from "react-icons/bs";
import { IconContext } from "react-icons";
import NotFound from "../Images/not-found.jpg";
const AddToList = ({ setIsOpen, song }) => {
  console.log(song);
  const dispatch = useDispatch();

  const AddSongPlaylist = (name, index) => {
    let newSong = {
      id: song.id,
      name: song.name,
      artistName: song.artistName,
      albumName: song.albumName,
      previewURL: song.previewURL,
      imageSrc:
        "https://api.napster.com/imageserver/v2/albums/" +
        song.albumId +
        "/images/500x500.jpg",
    };
    dispatch(AddToPlaylist(newSong, index));
    document.getElementById(name).style.display = "block";
  };
  const Lists = useSelector((state) => state.Playlist).playlists;

  return (
    <div className={s.ModalWindow} onClick={(e) => e.stopPropagation()}>
      <div className={s.ModalWindow__content}>
        <div className={s.ButtonClose} onClick={() => setIsOpen(false)}>
          <div className={s.Close}>X</div>
        </div>
        <div className={s.Header}>Add to:</div>
        <div className={s.Lists}>
          <ul>
            {Lists.map((list, index) => (
              <li
                key={list.name}
                className={s.List}
                onClick={() => AddSongPlaylist(list.name, index)}
              >
                <img
                  loading="lazy"
                  src={list.imageURL}
                  alt="File not found"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = NotFound; // Replace with default image
                  }}
                />
                <div className={s.imgShadow}>
                  <span>{list.name}</span>
                </div>
                <div id={list.name} className={s.clicked}>
                  <IconContext.Provider value={{ className: s.clickBtn }}>
                    <BsCheck />
                  </IconContext.Provider>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.Btns}>
          <button className={s.Btn} onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToList;
