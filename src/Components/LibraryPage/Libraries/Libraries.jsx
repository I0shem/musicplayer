import React, { useState, createRef } from "react";
import s from "./Libraries.module.css";
import { ReactComponent as Sprite } from "../../Icons/bin.svg";
import { Link } from "react-router-dom";
import addNewImage from "../../Images/add-new.jpg";
import Modal from "./Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { CreateNewPlaylist, DeletePlaylist } from "../../../redux/Actions";
import { IconContext } from "react-icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Libraries = () => {
  const list = useSelector((state) => state.Playlist).playlists;
  console.log(list);
  const [isOpen, setIsOpen] = useState(false);
  let newLibraryElementName = createRef();
  let newLibraryElementImg = createRef();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let createPlaylist = () => {
    let newLibraryName = newLibraryElementName.current.value;
    let newLibraryImg = newLibraryElementImg.current.value;
    if (newLibraryImg === "") {
      newLibraryImg =
        "https://cdn10.phillymag.com/wp-content/uploads/sites/3/2020/09/monthly-playlist.jpg";
    }
    if (newLibraryName === "") {
      newLibraryName = "MyLibrary";
    }
    let NewPlaylist = {
      name: newLibraryName,
      imageURL: newLibraryImg,
      tracks: [],
    };
    dispatch(CreateNewPlaylist(NewPlaylist));
    setIsOpen(false);
  };
  const returnToMain = () => {
    navigate("/m");
  };
  const viewLibrary = (lib) => {
    navigate("/m/LibraryPage/Library", { state: { lib } });
  };
  return (
    <div>
      <IconContext.Provider
        value={{
          size: "70px",
          className: s.backBtn,
        }}
      >
        <IoIosArrowRoundBack onClick={returnToMain} />
      </IconContext.Provider>
      <h3 className={s.Text}>Your Library</h3>
      <div className={s.Libraries}>
        {list.map((lib, i) => (
          <li key={i} className={s.Library} onClick={() => viewLibrary(lib)}>
            <div className={s.Image}>
              <img id={lib.name} className={s.Icon} alt="" src={lib.imageURL} />
              <div className={s.ImageOverlay}>
                <p>{lib.name}</p>
              </div>
            </div>

            <div onClick={() => dispatch(DeletePlaylist(lib))}>
              <Link href="" className={s.link}>
                <Sprite fill="white" stroke="white" className={s.Remove} />
              </Link>
            </div>
          </li>
        ))}
        <li className={s.Library} onClick={() => setIsOpen(true)}>
          <div className={s.addNewPlaylist}>
            <img alt="" className={s.AddNewIcon} src={addNewImage} />
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
              placeholder="Name"
            ></input>
          }
          newLibraryElementImg={
            <input
              ref={newLibraryElementImg}
              maxLength={200}
              type="text"
              placeholder="Image URL"
            ></input>
          }
          CreateBtn={<button onClick={createPlaylist}>Save</button>}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
export default Libraries;
