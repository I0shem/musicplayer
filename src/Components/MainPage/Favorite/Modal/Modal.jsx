import React, { useState, createRef } from "react";
import style from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { AddFavorite } from "../../../../redux/Actions";

const Modal = ({ setIsOpen }) => {
  let newFavoriteBandImageURL = createRef();
  const dispatch = useDispatch();
  let createFavBand = () => {
    let newFBName = "New Favorite Band";
    let newFBImg = newFavoriteBandImageURL.current.value;
    if (newFBImg === "") {
      newFBImg =
        "https://cdn10.phillymag.com/wp-content/uploads/sites/3/2020/09/monthly-playlist.jpg";
    }

    let NewFavorite = {
      id: newFBName,
      name: newFBName,
      imageURL: newFBImg,
    };
    dispatch(AddFavorite(NewFavorite));
    setIsOpen(false);
  };
  return (
    <div className={style.ModalWindow} onClick={() => setIsOpen(false)}>
      <div
        className={style.ModalWindow__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.ButtonClose} onClick={() => setIsOpen(false)}>
          <text>X</text>
        </div>
        <div className={style.Header}>Create New Favorite</div>
        <div className={style.Inputs}>
          <input
            ref={newFavoriteBandImageURL}
            maxLength={200}
            type="text"
            placeholder="Image URL"
          ></input>
        </div>
        <button onClick={() => setIsOpen(false)}>Close</button>
        <button onClick={createFavBand}>Save</button>
      </div>
    </div>
  );
};

export default Modal;
