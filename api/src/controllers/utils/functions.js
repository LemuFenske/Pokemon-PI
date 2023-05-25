const axios = require ('axios')
const URL = "https://pokeapi.co/api/v2/type"
const {Pokemon} = require('../../db')

const isUuid = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

const pokemonCreator = async (pokemon) => {
    const newPokemon = await Pokemon.create(pokemon)
    const {types} = pokemon;
    newPokemon.addType(types)
    return newPokemon;

}

const getAllTypes = async () => {
    const {data} = await axios(URL)
    return data.results
}

module.exports = {
    isUuid,
    pokemonCreator,
    getAllTypes
}