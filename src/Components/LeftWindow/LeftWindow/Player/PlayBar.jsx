import React, { useEffect, useState } from "react";
import { useAudioPosition } from "react-use-audio-player";
import s from "./Player.module.css";

const PlayBar = () => {
  const { percentComplete, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  });

  const goToPosition = React.useCallback(
    (percentage) => {
      seek(duration * (percentage / 100));
    },
    [duration, seek]
  );
  const [time, setTime] = useState({
    min: "00",
    sec: "00",
  });
  const [currTime, setCurrTime] = useState({
    min: "00",
    sec: "00",
  });
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const Seconds = Math.floor((duration % 3600) % 60);
    const Minutes = Math.floor((duration % 3600) / 60);
    const sec = Seconds < 10 ? `0${Seconds}` : Seconds;
    const min = Minutes < 10 ? `0${Minutes}` : Minutes;
    setTime({
      min,
      sec,
    });
  }, [duration]);

  useEffect(() => {
    if (duration) {
      const Minutes = Math.floor((duration * percentComplete) / 100 / 60);
      const Seconds = Math.floor(((duration * percentComplete) / 100) % 60);
      setSeconds(Seconds);
      const sec = Seconds < 10 ? `0${Seconds}` : Seconds;
      const min = Minutes < 10 ? `0${Minutes}` : Minutes;
      setCurrTime({
        min,
        sec,
      });
    }
  }, [percentComplete]);

  return (
    <>
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
        max="100"
        className={s.timeline}
        value={percentComplete}
        onChange={(e) => {
          goToPosition(e.target.value);
        }}
      />
    </>
  );
};

export default PlayBar;
