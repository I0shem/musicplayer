import React, { useEffect, useState } from "react";
import s from "./Player.module.css";
import { useAudioPlayer } from "react-use-audio-player";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { IconContext } from "react-icons";

import {
  BiSkipNext,
  BiSkipPrevious,
  BiVolumeFull,
  BiVolumeMute,
} from "react-icons/bi";

const AudioPlayer = ({ list, index, setIndex, listLength }) => {
  const SkipForward = () => {
    if (listLength === index) {
      setIndex(0);
    } else {
      const i = index + 1;
      setIndex(i);
    }
  };
  const SkipPrevious = () => {
    if (0 === index) {
      setIndex(listLength);
    } else {
      const i = index - 1;
      setIndex(i);
    }
  };

  const btnMute = () => {
    setVol(0);
  };
  const btnVolUp = () => {
    if (vol > 0.45) {
      setVol(0.5);
    } else {
      setVol(vol + 0.05);
    }
  };
  const { togglePlayPause, playing, volume } = useAudioPlayer({
    src: list[index],
    format: "mp3",
    autoplay: false,
    volume: 0.01,
    onend: () => SkipForward(),
  });
  const [vol, setVol] = useState(0.01);
  volume(vol);

  useEffect(() => {
    volume(vol);
  }, [vol]);

  return (
    <div>
      <div className={s.Controls}>
        <button className={s.skipPreviousButton}>
          <IconContext.Provider value={{ size: "5em", color: "#ffffffcc" }}>
            <BiSkipPrevious onClick={SkipPrevious} />
          </IconContext.Provider>
        </button>
        {!playing ? (
          <button className={s.playButton} onClick={togglePlayPause}>
            <IconContext.Provider value={{ size: "6em", color: "#ffffffcc" }}>
              <CiPlay1 />
            </IconContext.Provider>
          </button>
        ) : (
          <button className={s.pauseButton} onClick={togglePlayPause}>
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
      <div className={s.audiolineBox}>
        <IconContext.Provider value={{ size: "0.8em", color: "#ffffffcc" }}>
          <BiVolumeMute onClick={btnMute} />
        </IconContext.Provider>
        <div className={s.audioline}>
          <input
            type="range"
            step="0.01"
            min="0"
            max="0.5"
            value={vol}
            onChange={(e) => setVol(e.target.value)}
          />
        </div>
        <IconContext.Provider value={{ size: "0.8em", color: "#ffffffcc" }}>
          <BiVolumeFull onClick={btnVolUp} />
        </IconContext.Provider>
      </div>
    </div>
  );
};
export default AudioPlayer;
