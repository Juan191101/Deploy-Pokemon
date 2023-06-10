import React, { useState } from "react";
import Card from "../Card/Card";
import TypeFilter from "../Filters/TypeFilter";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import { getPokemons, setFilteredPokemons, setSelectedType } from "../../redux/actions";
import OriginFilter from "../Filters/OriginFilter";
import OrderAttack from "../Filters/OrderAttack";
import OrderAttackDesc from "../Filters/OrderAttackDesc";
import OrderAZ from "../Filters/OrderAZ";
import OrderZA from "../Filters/OrderZA";

const Cards = () => {
  const { pokemons, filteredPokemons, numPage } = useSelector((state) => state);
  const itemsPerPage = 12;

  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [selectedType, setSelectedType] = useState("");
  // eslint-disable-next-line
  const [showOrder, setShowOrder] = useState(false);
  // eslint-disable-next-line
  const [showFilter, setShowFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showOrderings, setShowOrderings] = useState(false);

  
  const startIndex = (numPage - 1) * itemsPerPage;
  const endIndex = numPage * itemsPerPage;

  let displayedPokemons = filteredPokemons.length > 0 ? filteredPokemons : pokemons;
  displayedPokemons = displayedPokemons.slice(startIndex, endIndex);

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  const handleClick = (fn) => {
    dispatch(fn());
  };
  const handleTypeChange = (event) => {
    const type = event.target.value;
    dispatch(setSelectedType(type));

    if (type) {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.types.includes(type.toLowerCase())
      );
      dispatch(setFilteredPokemons(filtered));
    } else {
      dispatch(setFilteredPokemons([]));
    }
  };

  const handleOrderButtonClick = () => {
    setShowOrderings(!showOrderings);
    setShowFilters(false); // Ocultar los filtros cuando se muestra el ordenamiento
  };
  
  const handleFilterButtonClick = () => {
    setShowFilters(!showFilters);
    setShowOrderings(false); // Ocultar los ordenamientos cuando se muestra el filtro
  };

  return (
          <div className={style.divTotal}>
            <div className={style.divFilters}>
        <button onClick={handleFilterButtonClick}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        {showFilters && (
          <>
            <OriginFilter />
            <TypeFilter onTypeChange={handleTypeChange} />
          </>
        )}
        <div>🟡</div>
        <button onClick={handleOrderButtonClick}>
          {showOrderings ? "Hide Sorts" : "Show Sorts"}
        </button>
        {showOrderings && (
          <>
            <OrderAZ />
            <OrderZA />
            <OrderAttack />
            <OrderAttackDesc />
          </>
        )}
      </div>

       <div className={style.divFilters2}>
        <SearchBar />
        <button onClick={(e) => handleClick(getPokemons, e)}>Refresh</button>
      </div>
      <div className={style.divContainer}>
        {displayedPokemons.map((pokemon) => (
          <Card
            id={pokemon.id}
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            attack={pokemon.attack}
            defense={pokemon.defense}
            speed={pokemon.speed}
            height={pokemon.height}
            weight={pokemon.weight}
            types={pokemon.types}
          />
        ))}
      </div>
      <div className={style.divFilters}>
        <Paginate cantPages={totalPages} />
      </div>
    </div>
  );
};

export default Cards;

