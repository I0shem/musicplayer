import React, { useState } from "react";
import styles from "./Recommended.module.css";
import newimage from "../../Images/add-new.jpg";
import { ReactComponent as Sprite } from "../../Icons/bin.svg";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";

const RecommendedProps = (props) => {
  const [visibleList, setvisibleList] = React.useState(true);
  const remove = () => {
    setvisibleList((visible) => !visible);
  };
  return (
    <>
      {visibleList && (
        <li className={styles.Playlist}>
          <img className={styles.Icon} alt="" src={props.image} />
          <p>{props.text}</p>
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

function Recommended(props) {
  const [isOpen, setIsOpen] = useState(false);
  let newRecommendedNameText = React.createRef();
  let newRecommendedImageURL = React.createRef();

  let createRecommended = () => {
    let newRecommendedName = newRecommendedNameText.current.value;
    let newRecommendedImage = newRecommendedImageURL.current.value;
    props.dispatch({
      type: "CREATE-NEW-RECOMMENDED",
      newRecommendedName,
      newRecommendedImage,
    });
    setIsOpen(false);
  };

  let Recommended = props.Data2.map((rec) => (
    <RecommendedProps key={rec.id} image={rec.image} text={rec.text} />
  ));

  return (
    <div className={styles.Recommended}>
      <ul className={styles.Playlists}>
        {Recommended}
        <div className={styles.PlaylistNew} onClick={() => setIsOpen(true)}>
          <li>
            <img className={styles.AddNewImage} alt="" src={newimage} />
            <span>Add New</span>
          </li>
        </div>
      </ul>
      {isOpen && (
        <Modal
          newRecommendedNameText={
            <input
              ref={newRecommendedNameText}
              maxLength={14}
              type="text"
              placeholder="List name"
            ></input>
          }
          newRecommendedImageURL={
            <input
              ref={newRecommendedImageURL}
              maxLength={200}
              type="text"
              placeholder="Recommended imge URL"
            ></input>
          }
          CreateBtn={<button onClick={createRecommended}>Save</button>}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

export default Recommended;
