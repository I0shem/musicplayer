import React from "react";
import style from "./Modal.module.css";

const Modal = ({
  setIsOpen,
  CreateBtn,
  newLibraryElementName,
  newLibraryElementImg,
}) => {
  return (
    <div className={style.ModalWindow} onClick={() => setIsOpen(false)}>
      <div
        className={style.ModalWindow__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.Content}>
          <div className={style.ButtonClose} onClick={() => setIsOpen(false)}>
            <text>X</text>
          </div>
          <div className={style.Header}>Create New list</div>
          <div className={style.Inputs}>
            {newLibraryElementName}
            {newLibraryElementImg}
          </div>
          <button onClick={() => setIsOpen(false)}>Close</button>
          {CreateBtn}
        </div>
      </div>
    </div>
  );
};

export default Modal;
