import {
  ADD_NEW_SONG,
  CREATE_NEW_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  ADD_LIKED_SONG,
  ADD_TO_LIST,
  DELETE_LIKED_SONG,
  DELETE_FROM_LIST,
  LOGIN,
  LOGOUT,
} from "./ActionTypes";

const PlaySong = (NewSong) => {
  return {
    type: ADD_NEW_SONG,
    NewSong: NewSong,
  };
};

const AddLikedSong = (LikedSong) => {
  return {
    type: ADD_LIKED_SONG,
    LikedSong,
  };
};
const DeleteLikedSong = (LikedSongID) => {
  return {
    type: DELETE_LIKED_SONG,
    LikedSongID,
  };
};

const AddToPlaylist = (newSong, index) => {
  return {
    type: ADD_TO_LIST,
    newSong: newSong,
    index: index,
  };
};

const DeleteFromPlaylist = (songID, playlistID) => {
  return {
    type: DELETE_FROM_LIST,
    songID,
    playlistID,
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

const NewUser = (userInfo) => {
  return {
    type: LOGIN,
    userInfo: userInfo,
  };
};

const SignOut = () => {
  return {
    type: LOGOUT,
  };
};

export {
  PlaySong,
  CreateNewPlaylist,
  DeletePlaylist,
  AddFavorite,
  DeleteFavorite,
  AddLikedSong,
  AddToPlaylist,
  DeleteLikedSong,
  DeleteFromPlaylist,
  NewUser,
  SignOut,
};
