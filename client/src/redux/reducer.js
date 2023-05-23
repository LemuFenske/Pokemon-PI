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
              // Filtrar los pokemons que vienen de la API (ID es un número)
              filteredPokemons = state.pokemons.filter(pokemon => typeof pokemon.id === 'number');
            } else if (payload === 'BDD') {
              // Filtrar los pokemons que vienen de la base de datos (ID es un UUID)
              filteredPokemons = state.pokemons.filter(pokemon => typeof pokemon.id === 'string');
            } else {
              // En caso de que payload no sea 'API' ni 'BDD', retornar el estado actual sin filtrar
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
              // Ordenar alfabéticamente de A a Z por nombre
              sortedPokemons = [...state.pokemons].sort((a, b) => a.name.localeCompare(b.name));
            } else if (payload === 'Z') {
              // Ordenar alfabéticamente de Z a A por nombre
              sortedPokemons = [...state.pokemons].sort((a, b) => b.name.localeCompare(a.name));
            } else if (payload === 'moreAttack') {
              // Ordenar por mayor a menor ataque
              sortedPokemons = [...state.pokemons].sort((a, b) => b.attack - a.attack);
            } else if (payload === 'lessAttack') {
              // Ordenar por menor a mayor ataque
              sortedPokemons = [...state.pokemons].sort((a, b) => a.attack - b.attack);
            } else {
              // En caso de que payload no coincida con ninguna opción, retornar el estado actual sin ordenar
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