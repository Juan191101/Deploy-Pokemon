import React from 'react';
import { useDispatch } from 'react-redux';
import { sortNameA } from '../../redux/actions';

const PokemonList = () => {
  const dispatch = useDispatch();

  const handleSort = () => {
    dispatch(sortNameA());
  };

  return (
    <div>
      <button onClick={handleSort}>Sort by Name A-Z</button>
    </div>
  );
};

export default PokemonList;
