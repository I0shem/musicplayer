import React, { useEffect, useState } from "react";
import s from "./Player.module.css";
import { useSelector } from "react-redux";
import { AudioPlayerProvider } from "react-use-audio-player";
import AudioPlayer from "./AudioPlayer.jsx";
import PlayBar from "./PlayBar.jsx";
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
  useEffect(() => {
    setIndex(list.length - 1);
  }, [listLength]);

  return (
    <AudioPlayerProvider>
      <div className={s.component}>
        <img className={s.musicCover} src={previewImg} alt="" />
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
          <h5 className={s.subTitle}>by {list[index].artistName}</h5>
          <h5 className={s.subTitleAlbum}>Album: {list[index].albumName}</h5>
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
          />
        </div>
      </div>
    </AudioPlayerProvider>
  );
};

export default MusicPlayer;
