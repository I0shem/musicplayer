import LeftWindow from "../LeftWindow/LeftWindow/LeftWindow.jsx";
import React from "react";
import MusicStyle from "./MusicStyle/MusicStyle";
import styles from "./MainPage.module.css";
import Recommended from "./Recommended/Recommended";
import Favorite from "./Favorite/Favorite";

function AppProps(props) {
  return <div className={props.style}></div>;
}

function MainPage(props) {
  return (
    <div className={styles.App}>
      <AppProps style={styles.Header}></AppProps>
      <div className={styles.MainPage}>
        <LeftWindow />
        <div className={styles.MainWindow}>
          <div className={styles.rectangle}></div>
          <div className={styles.Text}>Good Morning!</div>
          <MusicStyle Data1={props.Data1} />
          <div className={styles.Text}>Playlists</div>
          <Recommended
            dispatch={props.dispatch}
            createNewRecommended={props.createNewRecommended}
            Data2={props.Data2}
          />
          <div className={styles.Text}>Favorite Bands</div>
          <Favorite
            dispatch={props.dispatch}
            createNewFavorite={props.createNewFavorite}
            Data={props.Data}
          />
        </div>
      </div>
      <AppProps style={styles.Footer}></AppProps>
    </div>
  );
}

export default MainPage;
