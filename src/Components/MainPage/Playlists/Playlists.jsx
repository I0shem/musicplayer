import React, { useState, useEffect } from "react";
import styles from "./FP.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
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
  const getPlaylists = async () => {
    try {
      const response = await axios.get(
        `https://napi-v2-2-cloud-run-b3gtd5nmxq-uw.a.run.app/v2.2/playlists/featured?apikey=${KEY}`
      );
      setFeaturedPlaylistsDB(response.data.playlists);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPlaylists();
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
      </Slider>
    </div>
  );
}

export default Recommended;
