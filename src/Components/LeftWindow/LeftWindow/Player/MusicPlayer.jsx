import React, { useState } from "react";
import s from "./Player.module.css";
import { useSelector } from "react-redux";
import { AudioPlayerProvider } from "react-use-audio-player";
import AudioPlayer from "./AudioPlayer.jsx";
import PlayBar from "./PlayBar.jsx";
import NotFound from "../../../Images/not-found.jpg";

const MusicPlayer = () => {
  const list = useSelector(
    (state) => state.PlayerPlaylist
  ).initialPlayerPlaylist;
  const [index, setIndex] = useState(0);
  const currentSong = list[index].previewURL;
  const previewImg = list[index].imageSrc;
  let listLength = list.length - 1;
  const audioList = list.map((l) => {
    return l.previewURL;
  });
  const [autoPlay, setAutoPlay] = useState(false);

  const checkLength = (name) => {
    if (name.length > 20) {
      let newName = name.slice(0, 23) + "...";
      return newName;
    } else {
      return name;
    }
  };
  return (
    <AudioPlayerProvider>
      <div className={s.component}>
        <img
          loading="lazy"
          id="musicCover"
          className={s.musicCover}
          src={previewImg}
          alt="File not found"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = NotFound; // Replace with default image
          }}
        />
        <div>
          <div className={s.scrollingBox}>
            <div className={s.scrollingText}>
              <p>
                {list[index].name}-{list[index].name}-{list[index].name}
              </p>
              <p>
                -{list[index].name}-{list[index].name}-{list[index].name}-
              </p>
            </div>
          </div>
          <h5 className={s.subTitle}>
            by {checkLength(list[index].artistName)}
          </h5>
          <h5 className={s.subTitleAlbum}>
            Album: {checkLength(list[index].albumName)}
          </h5>
        </div>
        <div>
          <PlayBar file={currentSong} />
        </div>

        <div className={s.Controls}>
          <AudioPlayer
            list={audioList}
            index={index}
            setIndex={setIndex}
            listLength={listLength}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
          />
        </div>
      </div>
    </AudioPlayerProvider>
  );
};

export default MusicPlayer;
