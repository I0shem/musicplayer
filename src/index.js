import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./state";
import { ThemeProvider } from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <App
      AppState={store.getState()}
      dispatch={store.dispatch.bind(store)}
      Data={store._state.favbandsData}
      Data1={store._state.musicStyles1}
      Data2={store._state.recommended}
      Data3={store._state.libraries}
    />
  </ThemeProvider>
);
