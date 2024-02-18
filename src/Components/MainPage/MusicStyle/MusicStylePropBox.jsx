import React from "react";
import styles from "./MusicStyle.module.css";
import NotFound from "../../Images/not-found.jpg";
import { useNavigate } from "react-router-dom";
const MusicStylePropBox = (props) => {
  const navigate = useNavigate();

  const toComponentB = () => {
    navigate("/musicplayer/Tracks", { state: { ms: props.ms } });
  };
  return (
    <ul onClick={toComponentB} className={styles.Styles}>
      <li className={styles.Style}>
        <div className={styles.Image}>
          <img
            loading="lazy"
            className={styles.Icon}
            src={props.icon}
            alt="File not found"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = NotFound; // Set the default image path
            }}
          />
          <div className={styles.ImageFilter}>
            <p>{props.name}</p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default MusicStylePropBox;
