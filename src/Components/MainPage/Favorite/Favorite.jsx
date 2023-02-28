import React, { useState } from "react";
import styles from "./Favorite.module.css";
import newimage from "../../Images/add-new.jpg";
import { ReactComponent as Sprite } from "../../Icons/bin.svg";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";

const FavoriteProps = (props) => {
  const [visibleList, setvisibleList] = React.useState(true);
  const remove = () => {
    setvisibleList((visible) => !visible);
  };
  return (
    <>
      {visibleList && (
        <li className={styles.Band}>
          <img
            id="object-position"
            className={styles.Icon}
            alt=""
            src={props.Img}
          />
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
  const [isOpen, setIsOpen] = useState(false);
  let newFavoriteBandImageURL = React.createRef();

  let createFavoriteBand = () => {
    let newFavoriteBandImage = newFavoriteBandImageURL.current.value;
    props.dispatch({ type: "CREATE-NEW-FAVOURITE", newFavoriteBandImage });
    setIsOpen(false);
  };

  let Favbands = props.Data.map((fav) => (
    <FavoriteProps key={fav.id} Img={fav.Img} />
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
