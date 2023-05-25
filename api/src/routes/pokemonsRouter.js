const getPokemons = require('../controllers/getPokemons')
const getPokemonById = require('../controllers/getPokemonById')
const getPokemonByName = require('../controllers/getPokemonByName')
const createPokemon = require ('../controllers/createPokemon')
const deletePokemonDB = require ('../controllers/deletePokemonDB')
const updatePokemonDB = require ('../controllers/updatePokemonDB')


const { Router } = require('express')
const pokemonsRouter = Router()


pokemonsRouter.get('/', getPokemons)
pokemonsRouter.get('/name', getPokemonByName)
pokemonsRouter.put('/:id', updatePokemonDB)
pokemonsRouter.delete('/:id', deletePokemonDB)
pokemonsRouter.get('/:id', getPokemonById)
pokemonsRouter.post('/', createPokemon)




module.exports = pokemonsRouter