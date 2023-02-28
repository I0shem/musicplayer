import React from "react";
import style from "./Modal.module.css";

const Modal = ({ setIsOpen, CreateBtn, newFavoriteBandImageURL }) => {
  return (
    <div className={style.ModalWindow} onClick={() => setIsOpen(false)}>
      <div
        className={style.ModalWindow__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.ButtonClose} onClick={() => setIsOpen(false)}>
          <span>X</span>
        </div>
        <div className={style.Header}>New Favorite</div>
        <div className={style.Inputs}>{newFavoriteBandImageURL}</div>
        <button onClick={() => setIsOpen(false)}>Close</button>
        {CreateBtn}
      </div>
    </div>
  );
};

export default Modal;
