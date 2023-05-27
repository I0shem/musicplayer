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
import ReactLoading from "react-loading";

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
    if (vol > 0.9) {
      setVol(1);
    } else {
      setVol(vol + 0.1);
    }
  };

  const { togglePlayPause, playing, volume, load, loading, stop } =
    useAudioPlayer({
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

  useEffect(() => {
    var loadingAudio = document.getElementById("loading");
    if (loading === true) {
      loadingAudio.style.display = "block";
    } else {
      loadingAudio.style.display = "none";
    }
  }, [loading]);

  const SkipForward = () => {
    if (listLength === index) {
      setIndex(0);
    } else {
      const i = index + 1;
      setIndex(i);
    }
    load({
      src: list[index],
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
    });
  };

  useEffect(() => {
    volume(vol);
  }, [vol]);

  const PlayPauseBtn = () => {
    togglePlayPause();
  };
  useEffect(() => {
    setIndex(list.length - 1);
    if (listLength > 2) {
      setAutoPlay(true);
      stop();
    }
  }, [listLength]);
  return (
    <div className={s.component}>
      <div id="Visual" className={s.Visual}>
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
        <div id="loading" className={s.loading}>
          <ReactLoading
            className={s.loadingSvgContainer}
            type={"bars"}
            color={"white"}
            height={"20%"}
            width={"20%"}
          />
        </div>
      </div>
      <div className={s.Controls}>
        <button className={s.skipPreviousButton}>
          <IconContext.Provider value={{ className: s.prevBtn }}>
            <BiSkipPrevious onClick={SkipPrevious} />
          </IconContext.Provider>
        </button>
        {!playing ? (
          <button className={s.playButton} onClick={PlayPauseBtn}>
            <IconContext.Provider value={{ className: s.playBtn }}>
              <CiPlay1 />
            </IconContext.Provider>
          </button>
        ) : (
          <button className={s.pauseButton} onClick={PlayPauseBtn}>
            <IconContext.Provider value={{ className: s.pauseBtn }}>
              <CiPause1 />
            </IconContext.Provider>
          </button>
        )}
        <button className={s.skipButton}>
          <IconContext.Provider value={{ className: s.skipBtn }}>
            <BiSkipNext onClick={SkipForward} />
          </IconContext.Provider>
        </button>
      </div>
      <div className={s.audiolineBox}>
        <IconContext.Provider value={{ className: s.muteBtn }}>
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
        <IconContext.Provider value={{ className: s.volUpBtn }}>
          <BiVolumeFull onClick={btnVolUp} />
        </IconContext.Provider>
      </div>
    </div>
  );
};
export default AudioPlayer;
