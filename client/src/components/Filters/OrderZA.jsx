import React from 'react';
import { useDispatch } from 'react-redux';
import { sortNameD } from '../../redux/actions';

const PokemonList = () => {
  const dispatch = useDispatch();

  const handleSort = () => {
    dispatch(sortNameD());
  };

  return (
    <div>
      <button onClick={handleSort}>Sort by Name Z-A</button>
    </div>
  );
};

export default PokemonList;
