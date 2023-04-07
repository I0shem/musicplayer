import { CREATE_NEW_PLAYLIST, DELETE_PLAYLIST } from "./ActionTypes";
import HeartImg from "../Components/Images/heart.png";
import RecordsImg from "../Components/Images/records.jpg";
import CassetsImg from "../Components/Images/cassets.jpg";

const initialState = {
  playlists: [
    {
      name: "Liked",
      imageURL: HeartImg,
    },
    {
      name: "Name 1",
      imageURL: RecordsImg,
    },

    {
      name: "Name 1",
      imageURL: CassetsImg,
    },
  ],
};

export const PlaylistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_PLAYLIST: {
      return {
        ...state,
        playlists: [...state.playlists, action.newLibrary],
      };
    }
    case DELETE_PLAYLIST: {
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlists) => playlists.name !== action.delLibrary
        ),
      };
    }
    default: {
      return state;
    }
  }
};
