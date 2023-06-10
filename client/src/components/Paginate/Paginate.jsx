import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Paginate.module.css";
import { nextPage, previousPage } from "../../redux/actions";

export default function Paginate() {
  const { numPage, filteredPokemons } = useSelector((state) => state);
  const dispatch = useDispatch();

  function next() {
    dispatch(nextPage());
  }

  function prev() {
    dispatch(previousPage());
  }

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  return (
    <div className={styles.divPage}>
      <h3>(Current Page 🟦)</h3>
      {numPage > 1 ? (
        <div>
          <p className={styles.previousPage}>{numPage - 1}</p>
          <button onClick={prev}>PREV</button>
        </div>
      ) : null}

      <p className={styles.actualPage}>{numPage}</p>

      {numPage < totalPages ? (
        <div>
          <p className={styles.nextPage}>{numPage + 1}</p>
          <button onClick={next}>NEXT</button>
        </div>
      ) : null}
    </div>
  );
}