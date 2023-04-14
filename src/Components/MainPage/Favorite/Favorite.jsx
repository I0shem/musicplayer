import React, { useState } from "react";
import styles from "./Favorite.module.css";
import newimage from "../../Images/add-new.jpg";
import { ReactComponent as Sprite } from "../../Icons/bin.svg";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FavoriteProps = (props) => {
  const [visibleList, setvisibleList] = React.useState(true);
  const remove = () => {
    setvisibleList((visible) => !visible);
  };
  const navigate = useNavigate();
  const toArtistTracks = () => {
    navigate("/m/ArtistTracks", { state: { fav: props.fav } });
  };
  return (
    <>
      {visibleList && (
        <li className={styles.Band} onClick={toArtistTracks}>
          <div className={styles.Image}>
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
          <Link href="" className={styles.link}>
            <Sprite
              onClick={remove}
              fill="white"
              stroke="white"
              className={styles.Remove}
            />
          </Link>
        </li>
      )}
    </>
  );
};

const Favorite = (props) => {
  const list = useSelector((state) => state.Favorites).initialFavorites;
  console.log(list);

  const [isOpen, setIsOpen] = useState(false);
  let newFavoriteBandImageURL = React.createRef();

  let createFavoriteBand = () => {
    let newFavoriteBandImage = newFavoriteBandImageURL.current.value;
    props.dispatch({ type: "CREATE-NEW-FAVOURITE", newFavoriteBandImage });
    setIsOpen(false);
  };

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
      {isOpen && (
        <Modal
          newFavoriteBandImageURL={
            <input
              ref={newFavoriteBandImageURL}
              maxLength={200}
              type="text"
              placeholder="Image URL"
            ></input>
          }
          CreateBtn={<button onClick={createFavoriteBand}>Save</button>}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default Favorite;
