import "../../App.css";
import styles from "./LibraryPage.module.css";
import LeftWindow from "../LeftWindow/LeftWindow/LeftWindow.jsx";
import RightWindow from "./RightWindow/RightWindow";

function App(props) {
  return (
    <div className={styles.App}>
      <div className={styles.MainPage}>
        <LeftWindow />
        <RightWindow
          dispatch={props.dispatch}
          createNewPlaylist={props.createNewPlaylist}
          Data3={props.Data3}
        />
      </div>
    </div>
  );
}

export default App;
