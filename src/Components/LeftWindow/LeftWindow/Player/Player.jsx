import React from "react";
import styles from "./Player.module.css";
import MusicPlayer from "./MusicPlayer";

const Player = (props) => {
  return (
    <div className={styles.MusicPlaying}>
      <MusicPlayer Data4={props.Data4} />
    </div>
  );
};

export default Player;
