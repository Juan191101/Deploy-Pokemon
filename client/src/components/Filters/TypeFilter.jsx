
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedType, filterPokemonByType, setPage } from "../../redux/actions";

const TypeFilter = () => {
  const dispatch = useDispatch();
  const { selectedType } = useSelector((state) => state);

  const handleTypeChange = (event) => {
    const type = event.target.value;
    dispatch(setSelectedType(type));
  };

  const handleFilterClick = () => {
    dispatch(filterPokemonByType());
    dispatch(setPage(1))
  };
  return (
    <div>
        <h3>Filter Type</h3>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">All</option>
        <option value="normal">normal</option>
        <option value="fighting">fighting</option>
        <option value="flying">flying</option>
        <option value="poison">poison</option>
        <option value="ground">ground</option>
        <option value="rock">rock</option>
        <option value="bug">bug</option>
        <option value="ghost">ghost</option>
        <option value="steel">steel</option>
        <option value="fire">fire</option>
        <option value="water">water</option>
        <option value="grass">grass</option>
        <option value="electric">electric</option>
        <option value="psychic">psychic</option>
        <option value="ice">ice</option>
        <option value="dragon">dragon</option>
        <option value="dark">dark</option>
        <option value="fairy">fairy</option>
        <option value="unknown">unknown</option>
        <option value="shadow">shadow</option>
      </select>
      <button onClick={handleFilterClick}>Filter</button>
    </div>
  );
};

export default TypeFilter;
