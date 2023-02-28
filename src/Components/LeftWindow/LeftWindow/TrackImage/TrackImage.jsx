import React from "react";
import styles from "./TrackImage.module.css";
import sprite from "../../../Images/TrackImage.png";

function TrackImage() {
  return (
    <div className={styles.TrackImage}>
      <img alt="" src={sprite} />
    </div>
  );
}

export default TrackImage;
