import React, { useState, createRef } from "react";
import s from "./Libraries.module.css";
import { ReactComponent as Sprite } from "../../Icons/bin.svg";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { CreateNewPlaylist, DeletePlaylist } from "../../../redux/Actions";
import { IconContext } from "react-icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ReactLoading from "react-loading";
import Pagination from "@mui/material/Pagination";

const Libraries = () => {
  const list = useSelector((state) => state.Playlist).playlists;

  const [isOpen, setIsOpen] = useState(false);
  let newLibraryElementName = createRef();
  let newLibraryElementImg = createRef();
  const dispatch = useDispatch();

  let createPlaylist = () => {
    let newLibraryName = newLibraryElementName.current.value;
    let newLibraryImg = newLibraryElementImg.current.value;
    if (newLibraryImg === "") {
      newLibraryImg =
        "https://cdn10.phillymag.com/wp-content/uploads/sites/3/2020/09/monthly-playlist.jpg";
    }
    if (newLibraryName === "") {
      newLibraryName = `MyLibrary #${list.length}`;
    }
    let NewPlaylist = {
      name: newLibraryName,
      imageURL: newLibraryImg,
      tracks: [],
    };
    dispatch(CreateNewPlaylist(NewPlaylist));

    setIsOpen(false);
  };

  const [page, setPage] = useState(1);
  const [countElement] = useState(14);
  const lastLibraryIndex = page * countElement;
  const firstLibraryIndex = lastLibraryIndex - countElement;
  const currentLibraries = list.slice(firstLibraryIndex, lastLibraryIndex);
  const pagesCount = Math.ceil(list.length / countElement);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate();
  const returnTo = () => {
    navigate(-1);
  };
  const viewLibrary = (lib) => {
    navigate(`/m/LibraryPage/Library/${lib.name}`);
  };

  const fade = () => {
    let elem = document.getElementById("loader");
    elem.style.display = "none";
  };
  return (
    <div onLoad={fade}>
      <IconContext.Provider
        value={{
          size: "70px",
          className: s.backBtn,
        }}
      >
        <IoIosArrowRoundBack onClick={returnTo} />
      </IconContext.Provider>
      <h3 className={s.Text}>Your Library</h3>
      <div className={s.Libraries}>
        {currentLibraries.map((lib) => (
          <li key={lib.name} className={s.Library}>
            <div className={s.Image} onClick={() => viewLibrary(lib)}>
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
            <IconContext.Provider value={{ className: s.AddNewBtn }}>
              <AiOutlinePlusCircle />
            </IconContext.Provider>
            <p>Add New </p>
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
      <div id="loader" className={s.loader}>
        <div className={s.Loading}>
          <ReactLoading
            type={"bars"}
            color={"white"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      </div>
      <div className={s.PaginationBox}>
        <Pagination
          count={pagesCount}
          page={page}
          showFirstButton
          showLastButton
          onChange={handleChange}
          className={s.Pagination}
          sx={{
            ".Mui-selected": {
              backgroundColor: "rgba(70, 70, 70, 0.8)",
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
};
export default Libraries;
