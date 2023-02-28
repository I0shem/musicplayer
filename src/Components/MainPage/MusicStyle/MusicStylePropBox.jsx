import React from "react";
import styles from "./MusicStyle.module.css";

const MusicStylePropBox = (props) => {
  return (
    <ul className={styles.Styles}>
      <li className={styles.Style}>
        <img className={styles.Icon} alt="" src={props.icon} />
        <p>{props.name}</p>
      </li>
    </ul>
  );
};

export default MusicStylePropBox;
