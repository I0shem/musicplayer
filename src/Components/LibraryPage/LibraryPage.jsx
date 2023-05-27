import "../../App.css";
import s from "./LibraryPage.module.css";
import Libraries from "./Libraries/Libraries";

const App = () => {
  return (
    <div className={s.App}>
      <div className={s.MainPage}>
        <div className={s.rectangle}></div>
        <div className={s.RightWindow}>
          <Libraries />
        </div>
      </div>
    </div>
  );
};

export default App;
