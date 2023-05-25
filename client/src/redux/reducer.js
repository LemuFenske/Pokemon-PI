import { GET_POKEMON, GET_POKEMONS, ORDER, FILTER_ORIGIN, FILTER_TYPE, CLEAN_FILTERS } from "./actionsType";

const initialState = {
    pokemons: [],
    pokemon: {},
    pokemonsFiltered: [],
}




const reducer = (state = initialState, {type, payload}) => {
    
    switch(type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload
            }
        case GET_POKEMON: 
        return {
            ...state,
            pokemon: payload
        }
        case FILTER_ORIGIN: {
          
            let filteredPokemons;
            if (payload === 'API') {

              filteredPokemons = state.pokemons.filter(pokemon => typeof pokemon.id === 'number');
            } else if (payload === 'BDD') {

              filteredPokemons = state.pokemons.filter(pokemon => typeof pokemon.id === 'string');
            } else {

              return state;
            }
          
            return {
              ...state,
              pokemonsFiltered: filteredPokemons,
            };
          }  
          
        case FILTER_TYPE: {
            const pokemonsFilter = state.pokemons.filter(pokemon => pokemon.types.includes(payload));
            return {
                ...state, 
            pokemonsFiltered: [...pokemonsFilter]
            }
        }
        case ORDER: {
          
            let sortedPokemons;
            if (payload === 'A') {

              sortedPokemons = [...state.pokemons].sort((a, b) => a.name.localeCompare(b.name));
            } else if (payload === 'Z') {

              sortedPokemons = [...state.pokemons].sort((a, b) => b.name.localeCompare(a.name));
            } else if (payload === 'moreAttack') {

              sortedPokemons = [...state.pokemons].sort((a, b) => b.attack - a.attack);
            } else if (payload === 'lessAttack') {

              sortedPokemons = [...state.pokemons].sort((a, b) => a.attack - b.attack);
            } else {

              return state;
            }
          
            return {
              ...state,
              pokemonsFiltered: sortedPokemons,
            };
          }
          case CLEAN_FILTERS:
            return {
                ...state, 
                pokemonsFiltered: []
            }
        default: return {...state}
    }

}

export default reducer;