import React from "react";
import styles from "./RightWindow.module.css";
import Libraries from "./Libraries/Library";
function RightWindowText(props) {
  return <div className={styles.Text}>{props.text}</div>;
}

function RightWindow(props) {
  return (
    <>
      <div className={styles.rectangle}></div>
      <div className={styles.RightWindow}>
        <RightWindowText text="Your Library" />
        <Libraries
          dispatch={props.dispatch}
          createNewPlaylist={props.createNewPlaylist}
          Data3={props.Data3}
        />
      </div>
    </>
  );
}

export default RightWindow;
