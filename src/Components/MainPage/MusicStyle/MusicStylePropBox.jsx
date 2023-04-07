import React from "react";
import styles from "./MusicStyle.module.css";
import { Link, useNavigate } from "react-router-dom";
const MusicStylePropBox = (props) => {
  const navigate = useNavigate();

  const toComponentB = () => {
    navigate("/m/Tracks", { state: { ms: props.ms } });
  };
  return (
    <ul onClick={toComponentB} className={styles.Styles}>
      <li className={styles.Style}>
        <div className={styles.Image}>
          <img className={styles.Icon} alt="" src={props.icon} />
          <div className={styles.ImageFilter}>
            <p>{props.name}</p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default MusicStylePropBox;
