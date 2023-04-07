import React, { useState, useEffect } from "react";
import styles from "./MusicStyle.module.css";
import MusicStylePropBox from "./MusicStylePropBox";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const MUSIC_STYLE_KEY = process.env.REACT_APP_MUSIC_STYLE_KEY;

const MusicStyle = () => {
  const [musicStylesDB, setMusicStylesDB] = useState([]);

  const getGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.napster.com/v2.2/genres?apikey=${MUSIC_STYLE_KEY}`
      );
      setMusicStylesDB(response.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
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
    </div>
  );
};

export default MusicStyle;
