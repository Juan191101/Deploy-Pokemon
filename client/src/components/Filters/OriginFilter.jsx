import { useDispatch } from "react-redux";
import { setPage, api, database, getPokemons } from "../../redux/actions";

export default function FilterDbApi() {
  let dispatch = useDispatch();

  const handleClick = (fn) => {
    dispatch(fn());
    dispatch(setPage(1));
  };

  return (
    <div className="apidb">
      <h3 >Select Origin</h3>
      <button onClick={(e) => handleClick(getPokemons, e)} className="button">
        All
      </button>
      <button
        onClick={(e) => handleClick(api, e)}
        className={"button"}
        id="Api"
      >
        Api
      </button>
      <button
        onClick={(e) => handleClick(database, e)}
        className={"button"}
        id="Database"
      >
        Database
      </button>
    </div>
  );
}