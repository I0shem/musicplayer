import React, { useState } from "react";
import styles from "./Favorite.module.css";
import newimage from "../../Images/add-new.jpg";
import { ReactComponent as Sprite } from "../../Icons/bin.svg";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteFavorite } from "../../../redux/Actions";
const FavoriteProps = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toArtistTracks = () => {
    navigate("/m/ArtistTracks", { state: { fav: props.fav } });
  };
  return (
    <>
      <li className={styles.Band}>
        <div className={styles.Image} onClick={toArtistTracks}>
          <img
            id="object-position"
            className={styles.Icon}
            alt=""
            src={props.Img}
          />
          <div className={styles.ImageOverlay}>
            <p>{props.name}</p>
          </div>
        </div>
        <div onClick={() => dispatch(DeleteFavorite(props.fav))}>
          <Link href="" className={styles.link}>
            <Sprite fill="white" stroke="white" className={styles.Remove} />
          </Link>
        </div>
      </li>
    </>
  );
};

const Favorite = (props) => {
  const list = useSelector((state) => state.Favorites).initialFavorites;
  const [isOpen, setIsOpen] = useState(false);

  let Favbands = list.map((fav) => (
    <FavoriteProps key={fav.id} Img={fav.ImgURL} name={fav.name} fav={fav} />
  ));
  return (
    <div className={styles.Favorite}>
      <ul className={styles.Bands}>
        {Favbands}
        <div className={styles.NewFavorite} onClick={() => setIsOpen(true)}>
          <li>
            <img className={styles.AddNewImage} alt="" src={newimage} />
            <p>Add New</p>
          </li>
        </div>
      </ul>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Favorite;
