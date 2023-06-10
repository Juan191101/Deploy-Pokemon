import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName, setPage } from "../../redux/actions";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (el) => {
    el.preventDefault();
    setName(el.target.value);
  };

  function handleSubmit(el) {
    el.preventDefault();
    dispatch(setPage(1)); // Establecer la página actual en 1
    dispatch(getPokemonName(name.toLowerCase())); // Convertir a minúsculas antes de la búsqueda
    setName("");
  }

  return (
    <div>
      <h3>Search Pokemons!</h3>
      <input
        type="text"
        placeholder="Search..."
        value={name}
        onChange={(el) => handleInputChange(el)}
      />
      <button
        className="search"
        type="submit"
        value={name}
        onClick={(el) => handleSubmit(el)}
      >
        Buscar
      </button>
    </div>
  );
}
