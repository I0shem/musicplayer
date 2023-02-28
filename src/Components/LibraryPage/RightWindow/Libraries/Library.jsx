import React, { useState } from "react";
import styles from "./Library.module.css";
import { ReactComponent as Sprite } from "../../../Icons/bin.svg";
import { Link } from "react-router-dom";
import addNewimage from "../../../Images/add-new.jpg";
import Modal from "./Modal/Modal";

const LibrariesProps = (props) => {
  const [visibleList, setvisibleList] = React.useState(true);
  const remove = () => {
    setvisibleList((visible) => !visible);
  };
  return (
    <>
      {visibleList && (
        <li className={styles.Library}>
          <div className={styles.Image}>
            <img id={props.id} className={styles.Icon} alt="" src={props.Img} />
            <div className={styles.ImageOverlay}>
              <p>{props.text}</p>
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

function Library(props) {
  const [isOpen, setIsOpen] = useState(false);
  let newLibraryElementName = React.createRef();
  let newLibraryElementImg = React.createRef();

  let createPlaylist = () => {
    let newLibraryName = newLibraryElementName.current.value;
    let newLibraryImg = newLibraryElementImg.current.value;
    props.dispatch({
      type: "CREATE-NEW-PLAYLIST",
      newLibraryName,
      newLibraryImg,
    });
    setIsOpen(false);
  };
  let Library = props.Data3.map((lib) => (
    <LibrariesProps key={lib.id} Img={lib.Img} text={lib.text} />
  ));
  return (
    <div>
      <div className={styles.Libraries}>
        {Library}
        <li className={styles.Library} onClick={() => setIsOpen(true)}>
          <div className={styles.addNewPlaylist}>
            <img alt="" className={styles.AddNewIcon} src={addNewimage} />
            <p>Add New Playlist</p>
          </div>
        </li>
      </div>
      {isOpen && (
        <Modal
          newLibraryElementName={
            <input
              ref={newLibraryElementName}
              maxLength={14}
              type="text"
              placeholder="List name"
            ></input>
          }
          newLibraryElementImg={
            <input
              ref={newLibraryElementImg}
              maxLength={100}
              type="text"
              placeholder="List imge URL"
            ></input>
          }
          CreateBtn={<button onClick={createPlaylist}>Save</button>}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

export default Library;
