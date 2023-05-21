const axios = require ('axios')
const URL = 'https://pokeapi.co/api/v2/pokemon'
const {Pokemon, Type} = require('../db')



const getPokemons = async (req, res) => {
    try {
        const {data} = await axios(URL, {
          params: {
            limit: 50 
          }
        })
        const apiPokemons = []
      
        for (const pokemon of data.results) {
          const {data} = await axios.get(pokemon.url);
          const typeNames = data.types.map(type => type.type.name).join(', ');
          const onePokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.other.dream_world.front_default,
            hp: data.stats.find(s => s.stat.name === 'hp').base_stat,
            attack: data.stats.find(s => s.stat.name === 'attack').base_stat,
            defense: data.stats.find(s => s.stat.name === 'defense').base_stat,
            speed: data.stats.find(s => s.stat.name === 'speed').base_stat,
            height: data.height,
            weight: data.weight,
            types: typeNames
        }
          apiPokemons.push(onePokemon);
        }


        const pokemons = await Pokemon.findAll({
            include: {
              model: Type,
              through: { attributes: [] } // Excluye la tabla intermedia
            },
            attributes: { exclude: ['PokemonType'] }
          });
          const dbPokemons = pokemons.map(pokemon => {
            return {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.image,
              hp: pokemon.hp,
              attack: pokemon.attack,
              defense: pokemon.defense,
              speed: pokemon.speed,
              height: pokemon.height,
              weight: pokemon.weight,
              types: pokemon.Types.map(type => type.name).join(', ')
            }
          });
        
          const allPokemons = [...dbPokemons, ...apiPokemons]
        res.status(200).json(allPokemons)
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}

module.exports = getPokemons;