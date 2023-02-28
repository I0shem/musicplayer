import s from "./SearchWindow.module.css";
import LeftWindow from "../LeftWindow/LeftWindow/LeftWindow.jsx";
import SearchWindow from "./SearchWindow";

function SearchPage() {
  return (
    <div className={s.SearchPage}>
      <LeftWindow />
      <SearchWindow />
    </div>
  );
}

export default SearchPage;
