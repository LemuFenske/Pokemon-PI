const { Router } = require('express');
const getPokemons = require('../controllers/getPokemons')
const getPokemonById = require('../controllers/getPokemonById')
const getPokemonByName = require('../controllers/getPokemonByName')
const getTypes = require('../controllers/getTypes')
const createPokemon = require ('../controllers/createPokemon')



const router = Router();
router.get('/pokemons', getPokemons)
router.get('/pokemons/name', getPokemonByName)
router.get('/pokemons/:id', getPokemonById)
router.post('/pokemons', createPokemon)
router.get('/types', getTypes)


module.exports = router;
