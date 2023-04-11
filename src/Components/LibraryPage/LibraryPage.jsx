import "../../App.css";
import s from "./LibraryPage.module.css";
import Libraries from "./Libraries/Libraries";

const App = (props) => {
  return (
    <div className={s.App}>
      <div className={s.MainPage}>
        <div className={s.rectangle}></div>
        <div className={s.RightWindow}>
          <Libraries
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
