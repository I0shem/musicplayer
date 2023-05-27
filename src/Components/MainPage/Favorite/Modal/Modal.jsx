import React, { createRef, useState, useCallback, useEffect } from "react";
import s from "./Modal.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddFavorite } from "../../../../redux/Actions";
import Pagination from "@mui/material/Pagination";
import { IconContext } from "react-icons";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BsCircle } from "react-icons/bs";
import useSound from "use-sound";
const SEARCH_KEY = process.env.REACT_APP_SEARCH_KEY;

const Modal = ({ setIsOpen }) => {
  let newFavoriteBandImageURL = createRef();
  const dispatch = useDispatch();
  const [play] = useSound(
    "https://cdn.pixabay.com/audio/2022/03/10/audio_9beb587572.mp3"
  );
  const [value, setValue] = useState("");
  const [artistsDB, setArtistsDB] = useState([]);

  const getArtistsDB = useCallback(
    (options) => {
      if (value) {
        axios(options)
          .then((response) => {
            setArtistsDB(response.data.search.data.artists);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    [value]
  );

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://napi-v2-2-cloud-run-b3gtd5nmxq-uw.a.run.app/v2.2/search?apikey=${SEARCH_KEY}&query=${value}&type=artist`,
    };
    const timer = setTimeout(() => {
      getArtistsDB(options);
    }, 1000);
    return () => clearTimeout(timer);
  }, [value, getArtistsDB]);

  const onChangeValue = (value) => {
    setValue(value.target.value);
  };

  const [page, setPage] = useState(1);
  const [countElement] = useState(8);
  const lastArtistIndex = page * countElement;
  const firstArtistIndex = lastArtistIndex - countElement;
  const currentArtists = artistsDB.slice(firstArtistIndex, lastArtistIndex);
  const pagesCount = Math.ceil(artistsDB.length / countElement);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const replaceImage = (error) => {
    //replacement of broken Image
    error.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
  };

  const addFavorite = (a) => {
    play();
    let NewFavorite = {
      id: a.id,
      name: a.name,
      ImgURL:
        "https://api.napster.com/imageserver/v2/artists/" +
        a.id +
        "/images/633x422.jpg",
    };
    dispatch(AddFavorite(NewFavorite));
    CheckFav(a);
  };
  const ArtistsList = useSelector((state) => state.Favorites).initialFavorites;

  let idsArtistsList = ArtistsList.map((a) => a.id);

  const CheckFav = (a) => {
    if (idsArtistsList.includes(a.id)) {
      return (
        <div className={s.FavBtn}>
          <IconContext.Provider value={{ className: s.FavBtn }}>
            <IoIosCheckmarkCircle />
          </IconContext.Provider>
        </div>
      );
    } else {
      return (
        <div className={s.FavBtn}>
          <IconContext.Provider value={{ className: s.FavBtn }}>
            <BsCircle onClick={() => addFavorite(a)} />
          </IconContext.Provider>
        </div>
      );
    }
  };

  return (
    <div className={s.ModalWindow} onClick={(e) => e.stopPropagation()}>
      <div className={s.ModalWindow__content}>
        <div className={s.ButtonClose} onClick={() => setIsOpen(false)}>
          <text>X</text>
        </div>
        <div className={s.Header}>Artist Search</div>
        <div className={s.Inputs}>
          <input
            className={s.Input}
            ref={newFavoriteBandImageURL}
            maxLength={200}
            type="text"
            placeholder="Type here..."
            value={value}
            onChange={(e) => onChangeValue(e)}
          ></input>
        </div>
        <div className={s.ArtistsData}>
          {currentArtists.map((a) => {
            return (
              <div key={a.id} className={s.ArtistBox}>
                {CheckFav(a)}
                <img
                  className={s.ArtistImage}
                  src={
                    "https://api.napster.com/imageserver/v2/artists/" +
                    a.id +
                    "/images/633x422.jpg"
                  }
                  alt=""
                  onError={replaceImage}
                />
                <div className={s.ImageOverlay}>
                  <h5>{a.name}</h5>
                </div>
              </div>
            );
          })}
        </div>
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
        <div className={s.Btns}>
          <button className={s.Btn} onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
