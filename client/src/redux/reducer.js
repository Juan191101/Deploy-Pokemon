import { GET_POKEMONS, GET_POKEMON_ID, NEXT_PAGE,
     PREVIOUS_PAGE, ALL_TYPES,GET_POKEMON_NAME, SET_PAGE
    ,SET_SELECTED_TYPE, FILTER_POKEMON_BY_TYPE,
    SET_DATA_SOURCE,FILTER_DB,FILTER_API, SORT_POKEMONS_ASC,SORT_POKEMONS_DESC,
    SORT_NAME_ASC,SORT_NAME_DESC, CREATE_POKE } from "./actions"


const initialState = {
    pokemons:[],
    pokemonCopy:[],
    numPage:1,
    selectedType: "",
    filteredPokemons: [],
    dataSource: "all",
    sortedBy: null,
    pokeTypes:[],
    pokeDetail:[],
    pokeDetailCopy:[],
    filters: [], // Almacena los filtros aplicados
  sortBy: null, // Almacena el tipo de ordenamiento seleccionado

}

const rootReducer = (state = initialState, action) =>{
  const applyNameSort = (pokemonList) => {
    return [...pokemonList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  };
    switch (action.type) {
        
        case GET_POKEMONS:
            return{...state,
              pokemons: action.payload,
              pokemonCopy: action.payload,
              filteredPokemons: action.payload,}
        
        case GET_POKEMON_ID:
          return{
            ...state,
            pokeDetail: action.payload,
            pokeDetailCopy: action.payload
        }
            
        case GET_POKEMON_NAME:
            return{...state, filteredPokemons: action.payload}

        case ALL_TYPES: 
            return{
                ...state,
                pokeTypes: action.payload
            }

        case CREATE_POKE :
              return{
                  ...state,
                  pokemonCopy: state.pokemonCopy.concat(action.payload)
              }
        case NEXT_PAGE:
            return{
                ...state,
                numPage:state.numPage+1
            }

        case SET_PAGE:
            return{
                ...state,
                numPage:1
            }

        case SET_SELECTED_TYPE:
            return {
              ...state,
              selectedType: action.payload,
            };

            case PREVIOUS_PAGE:
                return{
                    ...state,
                    numPage:state.numPage-1
                }
      
            case SET_DATA_SOURCE:
          return {
            ...state,
            dataSource: action.payload,
          };

   case FILTER_POKEMON_BY_TYPE:
      // Aplica el filtro por tipo
      const { selectedType, pokemons, filters } = state;
      const filteredPokemons = pokemons.filter((pokemon) => {
        if (typeof pokemon.types[0] === "string") {
          // Para los Pokémon de la API
          return pokemon.types.includes(selectedType);
        } else if (typeof pokemon.types[0] === "object") {
          // Para los Pokémon de la base de datos
          return pokemon.types.some((type) => type.name === selectedType);
        } else {
          return false;
        }
      });

      // Aplica el ordenamiento si está activo
      if (state.sortBy && state.sortBy.attribute === "name") {
        applyNameSort(filteredPokemons);
      }

      return {
        ...state,
        filteredPokemons,
        filters: [...filters, { type: "type", value: selectedType }],
      };

    case FILTER_API:
      // Aplica el filtro para la API
      let apiFilter = state.pokemons.filter((pokemon) => {
        return typeof pokemon.id === "number";
      });

      // Aplica el ordenamiento si está activo
      if (state.sortBy && state.sortBy.attribute === "name") {
        applyNameSort(apiFilter);
      }

      return {
        ...state,
        filteredPokemons: apiFilter,
        filters: [...state.filters, { type: "api" }],
      };

    case FILTER_DB:
      // Aplica el filtro para la base de datos
      let dbFilter = state.pokemons.filter((pokemon) => {
        return typeof pokemon.id === "string";
      });

      // Aplica el ordenamiento si está activo
      if (state.sortBy && state.sortBy.attribute === "name") {
        applyNameSort(dbFilter);
      }

      if (dbFilter.length !== 0) {
        return {
          ...state,
          filteredPokemons: dbFilter,
          filters: [...state.filters, { type: "db" }],
        };
      } else {
        alert("No pokes in database");
        return state;
      }

    case SORT_POKEMONS_ASC:
      // Aplica el ordenamiento ascendente
      const attribute = action.payload;
      const sortedPokemons = [...state.filteredPokemons].sort(
        (a, b) => a[attribute] - b[attribute]
      );
      return {
        ...state,
        filteredPokemons: sortedPokemons,
        sortBy: { attribute, order: "asc" },
      };

    case SORT_POKEMONS_DESC:
      // Aplica el ordenamiento descendente
      const attribute1 = action.payload;
      const sortedPokemons1 = [...state.filteredPokemons].sort(
        (a, b) => b[attribute1] - a[attribute1]
      );
      return {
        ...state,
        filteredPokemons: sortedPokemons1,
        sortBy: { attribute: attribute1, order: "desc" },
      };

    case SORT_NAME_ASC:
      const sortedPokemons2 = [...state.filteredPokemons].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      return {
        ...state,
        filteredPokemons: sortedPokemons2,
        sortBy: { attribute: "name", order: "asc" },
      };

    case SORT_NAME_DESC:
      const sortedPokemons3 = [...state.filteredPokemons].sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      return {
        ...state,
        filteredPokemons: sortedPokemons3,
        sortBy: { attribute: "name", order: "desc" },
      };

    default:
      return { ...state };
  }
}

export default rootReducer