import React from "react";
import style from "./Modal.module.css";

const Modal = ({
  setIsOpen,
  CreateBtn,
  newRecommendedNameText,
  newRecommendedImageURL,
}) => {
  return (
    <div className={style.ModalWindow} onClick={() => setIsOpen(false)}>
      <div
        className={style.ModalWindow__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.ButtonClose} onClick={() => setIsOpen(false)}>
          <text>X</text>
        </div>
        <div className={style.Header}>Create New Playlist</div>
        <div className={style.Inputs}>
          {newRecommendedNameText}
          {newRecommendedImageURL}
        </div>
        <button onClick={() => setIsOpen(false)}>Close</button>
        {CreateBtn}
      </div>
    </div>
  );
};

export default Modal;
