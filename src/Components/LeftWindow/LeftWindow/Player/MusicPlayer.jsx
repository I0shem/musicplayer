import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import s from "./Player.module.css";
import { useSelector } from "react-redux";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const list = useSelector(
    (state) => state.PlayerPlaylist
  ).initialPlayerPlaylist;
  let listLength = list.length - 1;

  const previewSong = list[index].previewURL;
  const [play, { pause, duration, sound, stop }] = useSound(previewSong, {
    volume: 0.05,
    onend: () => {
      stop();
      setIsPlaying(true);
      if (listLength === index) {
        setIndex(0);
      } else {
        const i = index + 1;
        setIndex(i);
      }
      clearInput();
      play();
    },
  });
  const previewImg = list[index].imageSrc;
  const SkipForward = () => {
    if (listLength === index) {
      setIsPlaying(false);
      setIndex(0);
      stop();
      clearInput();
    } else {
      stop();
      setIsPlaying(false);
      const i = index + 1;
      setIndex(i);
      clearInput();
    }
  };

  const SkipPrevious = () => {
    if (0 === index) {
      setIsPlaying(false);
      setIndex(listLength);
      stop();
      clearInput();
    } else {
      stop();
      setIsPlaying(false);
      const i = index - 1;
      setIndex(i);
      clearInput();
    }
  };

  const playingButton = () => {
    clearInput();
    setIsPlaying(true);
    play();
  };
  const pauseButton = () => {
    setIsPlaying(false);
    pause();
  };

  const [time, setTime] = useState({
    min: "",
    sec: "",
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });

  useEffect(() => {
    setIsPlaying(false);
    setIndex(list.length - 1);
    stop();
    clearInput();
  }, [listLength]);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const Seconds = Math.floor((duration / 1000) % 60);
    const min = Math.floor((duration / (1000 * 60)) % 60);
    const sec = Seconds < 10 ? `0${Seconds}` : Seconds;
    setTime({
      min,
      sec,
    });
  }, [duration, sound, seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const Sec = Math.floor(sound.seek([]) % 60);
        const sec = Sec < 10 ? `0${Sec}` : Sec;
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);
  const clearInput = () => {
    setSeconds(0);
  };

  return (
    <>
      <div className={s.component}>
        <img className={s.musicCover} src={previewImg} alt="" />
        <div className={s.AudioVisualizerBox}></div>

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
          <div className={s.time}>
            <p>
              {currTime.min}:{currTime.sec}
            </p>
            <p>
              {time.min}:{time.sec}
            </p>
          </div>
          <input
            type="range"
            step="1"
            id="myInput"
            min="0"
            max={duration / 1000}
            className={s.timeline}
            value={seconds}
            onChange={(e) => {
              sound.seek(e.target.value);
            }}
          />
        </div>
        <div className={s.Controls}>
          <button className={s.skipPreviousButton}>
            <IconContext.Provider value={{ size: "5em", color: "#ffffffcc" }}>
              <BiSkipPrevious onClick={SkipPrevious} />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button className={s.playButton} onClick={playingButton}>
              <IconContext.Provider
                id="mainActionContainer"
                value={{ size: "6em", color: "#ffffffcc" }}
              >
                <CiPlay1 />
              </IconContext.Provider>
            </button>
          ) : (
            <button className={s.pauseButton} onClick={pauseButton}>
              <IconContext.Provider value={{ size: "6em", color: "#ffffffcc" }}>
                <CiPause1 />
              </IconContext.Provider>
            </button>
          )}
          <button className={s.skipButton}>
            <IconContext.Provider value={{ size: "5em", color: "#ffffffcc" }}>
              <BiSkipNext onClick={SkipForward} />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
