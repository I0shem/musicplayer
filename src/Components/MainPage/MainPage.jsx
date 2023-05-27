import React from "react";
import MusicStyle from "./MusicStyle/MusicStyle";
import styles from "./MainPage.module.css";
import Playlists from "./Playlists/Playlists";
import Favorite from "./Favorite/Favorite";

const AppProps = (props) => {
  return <div className={props.style}></div>;
};

const MainPage = () => {
  return (
    <div className={styles.App}>
      <AppProps style={styles.Header}></AppProps>
      <div className={styles.MainPage}>
        <div className={styles.MainWindow}>
          <div className={styles.rectangle}></div>
          <div className={styles.Text}>Music Styles</div>
          <MusicStyle />
          <div className={styles.Text}>Featured Playlists</div>
          <Playlists />
          <div className={styles.Text}>Favorite Artists</div>
          <Favorite />
        </div>
      </div>
      <AppProps style={styles.Footer}></AppProps>
    </div>
  );
};

export default MainPage;
