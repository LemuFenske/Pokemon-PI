import { GET_POKEMON, GET_POKEMONS } from "./actionsType";

const initialState = {
    pokemons: [],
    pokemon: {},
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
        default: return {...state}
    }

}

export default reducer;