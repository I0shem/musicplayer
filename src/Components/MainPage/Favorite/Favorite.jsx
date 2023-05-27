import React, { useState } from "react";
import s from "./Favorite.module.css";
import { ReactComponent as Sprite } from "../../Icons/bin.svg";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteFavorite } from "../../../redux/Actions";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

import Pagination from "@mui/material/Pagination";

const FavoriteProps = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toArtistTracks = () => {
    navigate("/m/ArtistTracks", { state: { fav: props.fav } });
  };
  return (
    <>
      <li className={s.Band}>
        <div className={s.Image} onClick={toArtistTracks}>
          <img id="object-position" className={s.Icon} alt="" src={props.Img} />
          <div className={s.ImageOverlay}>
            <p>{props.name}</p>
          </div>
        </div>
        <div onClick={() => dispatch(DeleteFavorite(props.fav))}>
          <Link href="" className={s.link}>
            <Sprite fill="white" stroke="white" className={s.Remove} />
          </Link>
        </div>
      </li>
    </>
  );
};

const Favorite = () => {
  const list = useSelector((state) => state.Favorites).initialFavorites;
  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [countElement] = useState(4);
  const lastFavIndex = page * countElement;
  const firstFavIndex = lastFavIndex - countElement;
  const currentFav = list.slice(firstFavIndex, lastFavIndex);
  const pagesCount = Math.ceil(list.length / countElement);

  const handleChange = (event, value) => {
    setPage(value);
  };

  let Favbands = currentFav.map((fav) => (
    <FavoriteProps key={fav.id} Img={fav.ImgURL} name={fav.name} fav={fav} />
  ));

  return (
    <div className={s.Favorite}>
      <ul className={s.Bands}>
        {Favbands}
        <div className={s.NewFavorite} onClick={() => setIsOpen(true)}>
          <li>
            <IconContext.Provider value={{ className: s.AddNewBtn }}>
              <AiOutlinePlusCircle />
            </IconContext.Provider>
            <p>Add New</p>
            <div className={s.AddNewImageOverlay}></div>
          </li>
        </div>
      </ul>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <div className={s.PaginationBox}>
        <Pagination
          selected
          count={pagesCount}
          page={page}
          showFirstButton
          showLastButton
          onChange={handleChange}
          className={s.Pagination}
          classes={{ selected: s.selected }}
          sx={{
            ".Mui-selected": {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Favorite;
