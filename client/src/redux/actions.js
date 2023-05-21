import { GET_POKEMONS, GET_POKEMON } from './actionsType';
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


export const filteredPokemons = () => {

}
 
