const {Pokemon, Type} = require('../db')
const {pokemonCreator} = require ('./utils/functions')



const createPokemon = async (req, res)=> {
    const pokemon = req.body
    try {
        const newPokemon = await pokemonCreator(pokemon)
        const pokemons = await Pokemon.findAll({
            include: {
              model: Type,
              through: { attributes: [] } 
            },
            attributes: { exclude: ['PokemonType'] }
          });
        res.status(200).json(pokemons)
    } catch (error) {
        res.status(404).json(error.message)
    }
}
module.exports = createPokemon;