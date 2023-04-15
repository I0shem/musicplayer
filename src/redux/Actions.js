import {
  ADD_NEW_SONG,
  CREATE_NEW_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_FAVORITE,
  DELETE_FAVORITE,
} from "./ActionTypes";

const PlaySong = (NewSong) => {
  return {
    type: ADD_NEW_SONG,
    NewSong: NewSong,
  };
};

const CreateNewPlaylist = (newLibrary) => {
  return {
    type: CREATE_NEW_PLAYLIST,
    newLibrary,
  };
};

const DeletePlaylist = (delLibrary) => {
  return {
    type: DELETE_PLAYLIST,
    delLibrary: delLibrary,
  };
};

const AddFavorite = (newFav) => {
  return {
    type: ADD_FAVORITE,
    newFav: newFav,
  };
};
const DeleteFavorite = (delFav) => {
  return {
    type: DELETE_FAVORITE,
    delFav: delFav,
  };
};

export {
  PlaySong,
  CreateNewPlaylist,
  DeletePlaylist,
  AddFavorite,
  DeleteFavorite,
};
