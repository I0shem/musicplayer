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

const AudioPlayer = ({
  list,
  index,
  setIndex,
  listLength,
  autoPlay,
  setAutoPlay,
}) => {
  const [vol, setVol] = useState(0.2);
  const btnMute = () => {
    setVol(0);
  };

  const btnVolUp = () => {
    if (vol > 0.95) {
      setVol(1);
    } else {
      setVol(vol + 0.05);
    }
  };

  const { togglePlayPause, playing, volume, load } = useAudioPlayer({
    src: list[index],
    format: "mp3",
    autoplay: autoPlay,
    volume: vol,
    onend: () => SkipForward(),
  });
  useEffect(() => {
    var visualAudio = document.getElementById("Visualizer");
    if (playing) {
      visualAudio.style.display = "block";
    } else {
      visualAudio.style.display = "none";
    }
  }, [playing]);

  const SkipForward = () => {
    if (listLength === index) {
      setIndex(0);
    } else {
      const i = index + 1;
      setIndex(i);
    }
    load({
      src: list[index],
      autoplay: true,
    });
    setAutoPlay(true);
  };
  const SkipPrevious = () => {
    if (0 === index) {
      setIndex(listLength);
    } else {
      const i = index - 1;
      setIndex(i);
    }
    load({
      src: list[index],
      autoplay: true,
    });
    setAutoPlay(true);
  };

  useEffect(() => {
    volume(vol);
  }, [vol]);

  const PlayPauseBtn = () => {
    load({
      src: list[index],
      autoplay: true,
    });
    togglePlayPause();
  };

  return (
    <div>
      <div id="Visualizer" className={s.AudioVisualizerBox}>
        <div className={s.icon}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={s.Controls}>
        <button className={s.skipPreviousButton}>
          <IconContext.Provider value={{ size: "5em", color: "#ffffffcc" }}>
            <BiSkipPrevious onClick={SkipPrevious} />
          </IconContext.Provider>
        </button>
        {!playing ? (
          <button className={s.playButton} onClick={PlayPauseBtn}>
            <IconContext.Provider value={{ size: "6em", color: "#ffffffcc" }}>
              <CiPlay1 />
            </IconContext.Provider>
          </button>
        ) : (
          <button className={s.pauseButton} onClick={PlayPauseBtn}>
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
            max="1"
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
