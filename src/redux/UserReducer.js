import { LOGOUT, LOGIN } from "./ActionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: { name: "", email: "", photoURL: "" },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: { name: "", email: "", photoURL: "" },
      };
    default:
      return state;
  }
};
