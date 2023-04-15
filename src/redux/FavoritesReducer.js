import { ADD_FAVORITE, DELETE_FAVORITE } from "./ActionTypes";

const State = {
  initialFavorites: [
    {
      id: "art.4085",
      name: "AC/DC",
      ImgURL:
        "https://api.napster.com/imageserver/v2/artists/art.4085/images/633x422.jpg",
    },
    {
      id: "art.40812",
      name: "Gorillaz",
      ImgURL:
        "https://api.napster.com/imageserver/v2/artists/art.40812/images/633x422.jpg",
    },

    {
      id: "art.9203143",
      name: "Arctic Monkeys",
      ImgURL:
        "https://api.napster.com/imageserver/v2/artists/art.9203143/images/633x422.jpg",
    },
  ],
};
export const FavoritesReducer = (state = State, action) => {
  switch (action.type) {
    case ADD_FAVORITE: {
      console.log(action.newFav);
      return {
        ...state,
        initialFavorites: [...state.initialFavorites, action.newFav],
      };
    }
    case DELETE_FAVORITE: {
      return {
        ...state,
        initialFavorites: state.initialFavorites.filter(
          (Favorite) => Favorite !== action.delFav
        ),
      };
    }
    default:
      return state;
  }
};
