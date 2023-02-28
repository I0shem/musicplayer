import React from "react";
import styles from "./Player.module.css";
import { ReactComponent as Sprite1 } from "../../../Icons/frame-4.svg";
import { ReactComponent as Sprite2 } from "../../../Icons/frame-5.svg";
import { ReactComponent as Sprite3 } from "../../../Icons/frame-6.svg";

function PlayerIconsProps(props) {
  return (
    <li>
      <props.sprite className={props.icon} alt="" />
    </li>
  );
}

function ProgressBarProps(props) {
  return <div className={props.style}></div>;
}

let PlayerIcons = [
  { id: 1, sprite: Sprite1, icon: styles.Icon4 },
  { id: 2, sprite: Sprite3, icon: styles.Icon6 },
  { id: 3, sprite: Sprite2, icon: styles.Icon5 },
];
let PlayerIconsMap = PlayerIcons.map((PI) => (
  <PlayerIconsProps key={PI.id} icon={PI.icon} sprite={PI.sprite} />
));
let BandSong = <span className={styles.Title}>Gorillaz - Kids with guns </span>;

function Player() {
  return (
    <div className={styles.MusicPlaying}>
      <h1>Music Playing:</h1>
      <div className={styles.ScrollText}>{BandSong}</div>
      <ProgressBarProps style={styles.ProgressBar} />
      <ProgressBarProps style={styles.Progress} />
      <ul className={styles.Controls}>{PlayerIconsMap}</ul>
    </div>
  );
}

export default Player;
