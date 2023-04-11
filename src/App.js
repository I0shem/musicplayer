import "./App.css";
import style from "./App.module.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Components/MainPage/MainPage";
import SearchPage from "./Components/SearchPage/SearchPage";
import LibraryPage from "./Components/LibraryPage/LibraryPage";
import Library from "./Components/LibraryPage/Libraries/Library";
import { ReactComponent as BurgerIcon } from "./Components/Icons/menu-burger.svg";
import { ReactComponent as CrossIcon } from "./Components/Icons/cross.svg";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import Tracks from "./Components/MainPage/MusicStyle/TopTracks/Tracks";
import LeftWindow from "./Components/LeftWindow/LeftWindow/LeftWindow";

const App = (props) => {
  const [MyTheme, setMyTheme] = useState("dark");
  const [buttonText, setButtonText] = useState("Dark mode");
  const toggleTheme = () => {
    setMyTheme((curr) =>
      curr === "dark" ? "light" : curr === "light" ? "custom" : "dark"
    );
    setButtonText((current) =>
      current === "Dark mode"
        ? "Light mode"
        : current === "Light mode"
        ? "Custom Mode"
        : "Dark mode"
    );
  };
  const [theme, setTheme] = useState(null);

  const click = (theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    document.body.style.background = theme;
  }, [theme]);

  const [Color, setColor] = useState(null);
  const ChangeTextColor = (Color) => {
    setColor(Color);
    document.body.style.color = Color;
  };
  useEffect(() => {
    document.body.style.color = Color;
  }, [Color]);

  const [active, IsActive] = useState(false);

  return (
    <BrowserRouter>
      <div
        style={{ color: { Color } }}
        title="Music Player"
        className={style.App}
      >
        <div className="Container">
          <ThemeContext.Provider value={{ toggleTheme }}>
            <LeftWindow />
            <div id={MyTheme}>
              <Routes>
                <Route
                  path="/m"
                  element={
                    <HomePage
                      dispatch={props.dispatch}
                      Data={props.Data}
                      Data1={props.Data1}
                      Data2={props.Data2}
                      Data4={props.Data4}
                    />
                  }
                />
                <Route path="/m/SearchPage" element={<SearchPage />} />
                <Route path="/m/LibraryPage" element={<LibraryPage />} />{" "}
                <Route path="/m/Tracks" element={<Tracks />} />
                <Route path="/m/LibraryPage/Library" element={<Library />} />
              </Routes>
            </div>
          </ThemeContext.Provider>
        </div>
        <div className={style.SideBar} onClick={() => IsActive(true)}>
          <Link className="Link">
            <BurgerIcon className={style.IconSettings} alt=""></BurgerIcon>
          </Link>
        </div>
        {active && (
          //*TODO: Варто доопрацювати теми: кастомна тема має мати інші базові кольори.
          //*TODO: Додати зміну мови, перенести методи входу. Додати субменю.
          <div className={style.SettingsMenu} onClick={() => IsActive(false)}>
            <div
              className={style.settingsSidebar}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={style.containerIcon}>
                <CrossIcon
                  className={style.IconQuit}
                  onClick={() => IsActive(false)}
                  alt=""
                ></CrossIcon>
              </div>
              <div className={style.ChangeTheme}>
                <label className={style.switch}>
                  <button className={style.ThemeButton} onClick={toggleTheme}>
                    {buttonText}
                  </button>
                </label>
              </div>
              <div className={style.Settings}>
                <ul>
                  <li>
                    <div
                      style={{
                        textAlign: "center",
                        width: "24vw",
                      }}
                    >
                      <h1
                        style={{
                          color: "white",
                          fontSize: "15px",
                          textAlign: "center",
                        }}
                      >
                        Choose custom background and text color
                      </h1>
                    </div>
                  </li>
                  <li>
                    <div className={style.ColorInput}>
                      <input type="color" id="ColorInputPrimary" />
                    </div>
                    <button
                      className={style.BackgroundColorButton}
                      onClick={() =>
                        click(
                          "linear-gradient(to bottom, " +
                            document.getElementById("ColorInputPrimary").value +
                            " 10%, " +
                            document.getElementById("ColorInputPrimary").value +
                            " 30%," +
                            document.getElementById("ColorInputSecondary")
                              .value +
                            " 100%)"
                        )
                      }
                    >
                      Apply new primary background color
                    </button>
                  </li>
                  <hr></hr>
                  <li>
                    <div className={style.ColorInput}>
                      <input type="color" id="ColorInputSecondary" />
                    </div>
                    <button
                      className={style.BackgroundColorButton}
                      onClick={() =>
                        click(
                          "linear-gradient(to bottom, " +
                            document.getElementById("ColorInputPrimary").value +
                            " 10%, " +
                            document.getElementById("ColorInputPrimary").value +
                            " 30%, " +
                            document.getElementById("ColorInputSecondary")
                              .value +
                            " 100%)"
                        )
                      }
                    >
                      Apply new secondary background color
                    </button>
                  </li>
                  <hr></hr>
                  <li>
                    <div className={style.ColorInput}>
                      <input type="color" id="ColorInputText" />
                    </div>
                    <button
                      className={style.BackgroundColorButton}
                      onClick={() =>
                        ChangeTextColor(
                          document.getElementById("ColorInputText").value
                        )
                      }
                    >
                      Apply new text color
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
