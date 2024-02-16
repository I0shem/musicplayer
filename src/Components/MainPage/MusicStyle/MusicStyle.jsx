import React, { useState, useEffect } from "react";
import styles from "./MusicStyle.module.css";
import MusicStylePropBox from "./MusicStylePropBox";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactLoading from "react-loading";

const MUSIC_STYLE_KEY = process.env.REACT_APP_MUSIC_STYLE_KEY;

const MusicStyle = () => {
  const [musicStylesDB, setMusicStylesDB] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getGenres = async () => {
    var loadingAudio = document.getElementById("loading");
    loadingAudio.style.display = "none";

    try {
      const response = await axios.get(
        `https://napi-v2-2-cloud-run-b3gtd5nmxq-uw.a.run.app/v2.2/genres?apikey=${MUSIC_STYLE_KEY}`
      );
      setMusicStylesDB(response.data.genres);
    } catch (error) {
      console.log(error);
    }
    loadingAudio.style.display = "block";
  };

  useEffect(() => {
    getGenres();
    setLoaded(true);
  }, []);

  return (
    <div className={styles.MusicDBContainer}>
      <Slider
        dots={true}
        infinite={true}
        slidesToShow={5}
        speed={500}
        autoplay={true}
        autoplaySpeed={2000}
        slidesToScroll={1}
      >
        {musicStylesDB.map((ms) => (
          <MusicStylePropBox
            key={ms.id}
            icon={`https://api.napster.com/imageserver/images/${ms.id}/240x160.jpg`}
            name={ms.name}
            ms={ms}
          />
        ))}
      </Slider>
      {!loaded && (
        <div id="loading" className={styles.loading}>
          <ReactLoading
            type={"bars"}
            color={"white"}
            height={"5%"}
            width={"5%"}
          />
        </div>
      )}
    </div>
  );
};

export default MusicStyle;
