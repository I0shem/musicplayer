import React from "react";
import styles from "./Player.module.css";
import MusicPlayer from "./MusicPlayer";

const Player = (props) => {
  return (
    <div className={styles.MusicPlaying}>
      <MusicPlayer />
    </div>
  );
};

export default Player;
