import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./state";
import { ThemeProvider } from "react-bootstrap";
import { Provider } from "react-redux";
import { sstore } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={sstore}>
    <ThemeProvider>
      <App
        AppState={store.getState()}
        dispatch={store.dispatch.bind(store)}
        Data={store._state.favbandsData}
        Data1={store._state.musicStyles1}
        Data2={store._state.recommended}
        Data3={store._state.libraries}
        Data4={store._state.playList}
      />
    </ThemeProvider>{" "}
  </Provider>
);
