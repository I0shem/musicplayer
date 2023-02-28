import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./SearchWindow.module.css";
import clr from "../Icons/cross.svg";

function SearchWindow() {
  const [musicDB, setMusicDB] = useState([]);
  const [value, setValue] = useState("");
  const API_KEY = "OTMxMmMxMGEtNzllYi00Yjg4LWE5NmItNWI2MTdkOWMyNmMz";

  const options = {
    metod: "GET",
    url: `https://api.napster.com/v2.2/search/verbose?apikey=${API_KEY}&query=${value}`,
  };

  const getMusicDB = () => {
    if (value === "") {
    } else {
      axios(options).then((response) => {
        setMusicDB(response.data.search.data.tracks);
        console.log(musicDB);
      });
    }
  };

  const Clear = () => {
    setValue("");
    setMusicDB([]);
  };

  useEffect(
    () => {
      const timer = setTimeout(() => {
        getMusicDB();
      }, 1000);
      return () => clearTimeout(timer);
    },
    [getMusicDB, options.url],
    []
  );

  return (
    <>
      <div className={s.RightWindow}>
        <h3 className={s.Text}>Search</h3>
        <div>
          <div className={s.SearchBar}>
            <form action="">
              <input
                className={s.Search}
                type="text"
                placeholder="Songs, Artists, Podcasts ..."
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <img src={clr} alt="" className={s.searchIcon} onClick={Clear} />
            </form>
          </div>

          <div className={s.MusicData}>
            {musicDB.map((m) => {
              return (
                <div key={m.id} className={s.TrackBox}>
                  <img
                    className={s.AlbumImage}
                    src={
                      "https://api.napster.com/imageserver/v2/albums/" +
                      m.albumId +
                      "/images/500x500.jpg"
                    }
                    alt=""
                  />
                  <div className={s.ImageOverlay}>
                    <h5>"{m.name}"</h5>
                    <h6> by {m.artistName}</h6>
                    <p>Album: {m.albumName}</p>
                  </div>
                  <div className={s.audioPlayer}>
                    <audio id="myAudio" src={m.previewURL} controls />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={s.rectangle}></div>
      </div>
    </>
  );
}

export default SearchWindow;
