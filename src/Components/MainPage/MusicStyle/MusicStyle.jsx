import React, { useState, useEffect } from "react";
import styles from "./MusicStyle.module.css";
import MusicStylePropBox from "./MusicStylePropBox";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MusicStyle(props) {
  const [musicStylesDB, setMusicStylesDB] = useState([]);
  const API_KEY = "OTMxMmMxMGEtNzllYi00Yjg4LWE5NmItNWI2MTdkOWMyNmMz";

  const getGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.napster.com/v2.2/genres?apikey=${API_KEY}`
      );
      setMusicStylesDB(response.data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  // Props based Styles from state
  // let MusicStyles = props.Data1.map((ms1) => (
  //   <MusicStylePropBox key={ms1.id} icon={ms1.Img} name={ms1.Name} />
  // ));

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
          />
        ))}
      </Slider>
    </div>
  );
}

export default MusicStyle;
