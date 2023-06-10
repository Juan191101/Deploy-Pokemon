import React from 'react';
import { useDispatch } from 'react-redux';
import { sortPokemonsD } from '../../redux/actions';

const PokemonList = () => {
  const dispatch = useDispatch();

  const handleSort = () => {
    dispatch(sortPokemonsD('attack'));
  };

  return (
    <div>
      <button onClick={handleSort}>Attack Descendant</button>
    </div>
  );
};

export default PokemonList;