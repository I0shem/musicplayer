import React from "react";
import styles from "./MusicStyle.module.css";
import MusicStylePropBox from "./MusicStylePropBox";

function MusicStyle(props) {
  let MusicStyles = props.Data1.map((ms1) => (
    <MusicStylePropBox key={ms1.id} icon={ms1.Img} name={ms1.Name} />
  ));

  return <div className={styles.MusicStyle}>{MusicStyles}</div>;
}

export default MusicStyle;
