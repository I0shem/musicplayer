import "../../App.css";
import styles from "./LibraryPage.module.css";
import LeftWindow from "../LeftWindow/LeftWindow/LeftWindow.jsx";
import Library from "./Libraries/Library";

const RightWindowText = (props) => {
  return <div className={styles.Text}>{props.text}</div>;
};
const App = (props) => {
  return (
    <div className={styles.App}>
      <div className={styles.MainPage}>
        <LeftWindow />
        <div className={styles.rectangle}></div>
        <div className={styles.RightWindow}>
          <RightWindowText text="Your Library" />
          <Library
            dispatch={props.dispatch}
            createNewPlaylist={props.createNewPlaylist}
            Data3={props.Data3}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
