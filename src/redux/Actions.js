import {
  ADD_NEW_SONG,
  CREATE_NEW_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_FAVORITE,
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

const DeletePlaylist = (index) => {
  return {
    type: DELETE_PLAYLIST,
    delLibrary: index,
  };
};

const AddFavorite = (newFav) => {
  return {
    type: ADD_FAVORITE,
    newFav: newFav,
  };
};

export { PlaySong, CreateNewPlaylist, DeletePlaylist, AddFavorite };
