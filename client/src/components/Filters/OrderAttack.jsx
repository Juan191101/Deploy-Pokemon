import React from 'react';
import { useDispatch } from 'react-redux';
import { sortPokemonsA } from '../../redux/actions';

const PokemonList = () => {
  const dispatch = useDispatch();

  const handleSort = () => {
    dispatch(sortPokemonsA('attack'));
  };

  return (
    <div>
      <button onClick={handleSort}>Attack Ascendant</button>
    </div>
  );
};

export default PokemonList;