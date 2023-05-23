import { GET_POKEMONS, GET_POKEMON, FILTER_ORIGIN, FILTER_TYPE, ORDER, CLEAN_FILTERS} from './actionsType';
import axios from 'axios'

const limit = 50;
export const getPokemons = () => {
    return async function (dispatch){
        const {data} = await axios.get(`http://localhost:3001/pokemons?limit=${limit}`)
        dispatch ({type: GET_POKEMONS, payload: data})
    }
    
}


export const getPokemon = (id) => {
    return async function (dispatch){
        const {data} = await axios.get(`http://localhost:3001/pokemons/${id}`)
        dispatch ({type: GET_POKEMON, payload: data})
    }
}

export const filterPokemonsType = (type) => {
    return {
        type: FILTER_TYPE,
        payload: type
    }
}

export const filterPokemonsOrigin = (origin) => {
    return {
        type: FILTER_ORIGIN,
        payload: origin
    }
}


export const orderPokemons = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}

export const cleanFilters = () => {
    return {
        type: CLEAN_FILTERS
    }
}