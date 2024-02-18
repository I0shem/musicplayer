import React, { useState, useEffect } from "react";
import styles from "./FP.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import ReactLoading from "react-loading";
import NotFound from "../../Images/not-found.jpg";
const KEY = process.env.REACT_APP_MUSIC_STYLE_KEY;

const PlaylistsProps = (props) => {
  const navigate = useNavigate();
  const toFeaturedPlaylists = () => {
    navigate("/musicplayer/FeaturedPlaylist", { state: { fp: props.fp } });
  };
  return (
    <>
      <ul onClick={toFeaturedPlaylists} className={styles.FPs}>
        <li className={styles.FP}>
          <div className={styles.Image}>
            <img
              loading="lazy"
              className={styles.Icon}
              alt="File not found"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = NotFound; // Replace with default image
              }}
              src={props.icon}
            />
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
  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylists = async () => {
    try {
      const response = await axios.get(
        `https://api.napster.com//v2.2/playlists/top?apikey=${KEY}`
      );
      setFeaturedPlaylistsDB(response.data.playlists);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

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
