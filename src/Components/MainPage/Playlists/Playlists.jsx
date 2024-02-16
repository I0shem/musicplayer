import React, { useState, useEffect } from "react";
import styles from "./FP.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import ReactLoading from "react-loading";
const KEY = process.env.REACT_APP_MUSIC_STYLE_KEY;

const PlaylistsProps = (props) => {
  const navigate = useNavigate();
  const toFeaturedPlaylists = () => {
    navigate("/m/FeaturedPlaylist", { state: { fp: props.fp } });
  };
  return (
    <>
      <ul onClick={toFeaturedPlaylists} className={styles.FPs}>
        <li className={styles.FP}>
          <div className={styles.Image}>
            <img className={styles.Icon} alt="" src={props.icon} />
            <div className={styles.ImageFilter}>
              <p>{props.name}</p>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

function Recommended() {
  const [featuredPlaylistsDB, setFeaturedPlaylistsDB] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getPlaylists = async () => {
    try {
      const response = await axios.get(
        `https://api.napster.com//v2.2/playlists/top?apikey=${KEY}`
      );
      setFeaturedPlaylistsDB(response.data.playlists);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaylists();
    setLoaded(true);
  }, []);

  return (
    <div className={styles.featuredPlaylistsDB}>
      <Slider
        dots={true}
        infinite={true}
        slidesToShow={5}
        speed={500}
        autoplay={true}
        autoplaySpeed={5000}
        slidesToScroll={1}
      >
        {featuredPlaylistsDB.map((fp) => (
          <PlaylistsProps
            key={fp.id}
            icon={`http://direct.napster.com/imageserver/v2/playlists/${fp.id}/artists/images/1200x400.jpg`}
            name={fp.name}
            fp={fp}
          />
        ))}
      </Slider>{" "}
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
}

export default Recommended;
