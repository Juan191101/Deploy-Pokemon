import axios from "axios"
export const SET_SELECTED_TYPE = "SET_SELECTED_TYPE";
export const FILTER_POKEMON_BY_TYPE = "FILTER_POKEMON_BY_TYPE";
export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON_ID = "GET_POKEMON_ID"
export const ALL_TYPES = "ALL_TYPES"
export const NEXT_PAGE = "NEXT_PAGE"
export const PREVIOUS_PAGE = "PREVIOUS_PAGE"
export const GET_POKEMON_NAME = "GET_POKEMON_NAME"
export const SET_PAGE = "SET_PAGE"
export const SET_FILTERED_POKEMONS = "SET_FILTERED_POKEMONS"
export const SET_DATA_SOURCE = "SET_DATA_SOURCE"
export const FILTER_API = "FILTER_API"
export const FILTER_DB = "FILTER_DB"
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK"
export const SORT_POKEMONS_ASC = "SORT_POKEMONS_ASC"
export const SORT_POKEMONS_DESC = "SORT_POKEMONS_DESC"
export const SORT_NAME_ASC = "SORT_NAME_ASC"
export const SORT_NAME_DESC = "SORT_NAME_DESC"
export const CREATE_POKE = "CREATE_POKE"
export const UPDATE_POKE = "UPDATE_POKE"


export const getPokemons = () =>{
    return async function(dispatch){
        const pokemons = await axios.get("/pokemons")
        return dispatch({
            type: GET_POKEMONS,
            payload: pokemons.data
        })
    }
}

export const getPokemonId = (id) => {
  return async function (dispatch) {
    const myPoke = await axios.get("/pokemons/" + id);
    console.log(myPoke);
    return dispatch({
      type: GET_POKEMON_ID,
      payload: myPoke.data,
    });
  };
};

export const getPokemonName = (name) => {
  return async function (dispatch) {
    const lowerCaseName = name.toLowerCase(); // Convertir el nombre a minúsculas
    const pokemons = await axios.get(`/pokemons?name=${lowerCaseName}`);
    return dispatch({
      type: GET_POKEMON_NAME,
      payload: pokemons.data,
    });
  };
};

export const allTypes = () =>{
  return async function(dispatch){
    const allMyTypes = await axios.get("/types")
    return dispatch({
        type: ALL_TYPES,
        payload:allMyTypes.data
    })
}
}

export const createPoke = (payload) => {
  return async function(dispatch){
    const newPoke = await axios.post("/pokemons", payload)
    return dispatch({
    type: CREATE_POKE,
    payload: newPoke
    })
}
};



export function nextPage(){
    return{
        type:NEXT_PAGE
    }
}
export function previousPage(){
    return{
        type:PREVIOUS_PAGE
    }
}

export const setPage = (page) => {
    return {
      type: 'SET_PAGE',
      payload: page
    };
  };

  export const setSelectedType = (type) => ({
  type: SET_SELECTED_TYPE,
  payload: type,
});

export const filterPokemonByType = () => ({
  type: FILTER_POKEMON_BY_TYPE,
});

export function orderByAttack(payload) {
    return {
      type: ORDER_BY_ATTACK,
      payload
    };
  }

  export const sortPokemonsA = (attribute) => {
    return {
      type: SORT_POKEMONS_ASC,
      payload: attribute
    };
  };
  export const sortPokemonsD = (attribute) => {
    return {
      type: SORT_POKEMONS_DESC,
      payload: attribute
    };
  };

  export const sortNameA = () => {
    return {
      type: SORT_NAME_ASC
    };
  };

  export const sortNameD = () => {
    return {
      type: SORT_NAME_DESC
    };
  };

export const setFilteredPokemons = (filteredPokemons) => ({
    type: SET_FILTERED_POKEMONS,
    payload: filteredPokemons,
  });

  export const setDataSource = (source) => ({
    type: SET_DATA_SOURCE,
    payload: source,
  });

  export function api(payload) {
    return {
      type: FILTER_API,
      payload: payload,
    };
  }
  
  export function database(payload) {
    return {
      type: FILTER_DB,
      payload: payload,
    };

 
      
      
      
      
  }