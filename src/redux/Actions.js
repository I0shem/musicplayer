import {
  ADD_NEW_SONG,
  CREATE_NEW_PLAYLIST,
  DELETE_PLAYLIST,
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

export { PlaySong, CreateNewPlaylist, DeletePlaylist };
