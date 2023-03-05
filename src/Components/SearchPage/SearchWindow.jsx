import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import s from "./SearchWindow.module.css";
import clr from "../Icons/cross.svg";
import Pagination from "@mui/material/Pagination";

function SearchWindow() {
  const [musicDB, setMusicDB] = useState([]);
  const [value, setValue] = useState("");
  const API_KEY = "OTMxMmMxMGEtNzllYi00Yjg4LWE5NmItNWI2MTdkOWMyNmMz";
  const Clear = () => {
    setValue("");
    setMusicDB([]);
  };

  const getMusicDB = useCallback(
    (options) => {
      if (value) {
        // check if value exists or not
        axios(options)
          .then((response) => {
            setMusicDB(response.data.search.data.tracks);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    [musicDB, value]
  );

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.napster.com/v2.2/search/verbose?apikey=${API_KEY}&query=${value}`,
    };
    const timer = setTimeout(() => {
      getMusicDB(options);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  const onChangeValue = (value) => {
    setValue(value.target.value);
    console.log(musicDB);
  };

  //Console update
  useEffect(() => {
    console.log(musicDB);
  }, [musicDB]);

  //Pagination MUI
  const [page, setPage] = useState(1);
  const [countElement] = useState(8);
  const lastMusicIndex = page * countElement;
  const firstImageIndex = lastMusicIndex - countElement;
  const currentMusic = musicDB.slice(firstImageIndex, lastMusicIndex);
  const pagesCount = Math.ceil(musicDB.length / countElement);
  const handleChange = (value) => {
    setPage(value);
  };
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
                placeholder="Songs, Artists, Podcasts..."
                value={value}
                onChange={(e) => onChangeValue(e)}
              />
              <img src={clr} alt="" className={s.searchIcon} onClick={Clear} />
            </form>
          </div>

          <div className={s.MusicData}>
            {currentMusic.map((m) => {
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
            <div className={s.PaginationBox}>
              <Pagination
                count={pagesCount}
                page={page}
                showFirstButton
                color="secondary"
                showLastButton
                onChange={handleChange}
                className={s.Pagination}
                textPrimary
                variant="text"
              />
            </div>
          </div>
        </div>
        <div className={s.rectangle}></div>
      </div>
    </>
  );
}

export default SearchWindow;
