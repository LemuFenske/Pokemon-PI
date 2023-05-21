const axios = require ('axios');
const {Pokemon, Type} = require('../db');
const URL = 'https://pokeapi.co/api/v2/pokemon'
const {Op} = require('sequelize')

const getPokemonByName = async (req, res) => {
    try {
      const name = req.query.name;
      const urlName = name.toLowerCase()
  
      const dbResults = await Pokemon.findOne({
        where: {
          name: {
            [Op.iLike]: name
          }
        },
        include: {
          model: Type,
          through: { attributes: [] }
        },
        attributes: { exclude: ['PokemonType'] }
      })
      
  
      let pokemon = null;
  
      if (dbResults) {
        const dbPokemon = {
          id: dbResults.id,
          name: dbResults.name,
          image: dbResults.image,
          hp: dbResults.hp,
          attack: dbResults.attack,
          defense: dbResults.defense,
          speed: dbResults.speed,
          height: dbResults.height,
          weight: dbResults.weight,
          types: dbResults.Types.map(type => type.name).join(', ')
        }
        pokemon = dbPokemon

      } else {
        const { data } = await axios(`${URL}/${urlName}`);
        if (!data.name) throw Error('No se encontró ese nombre');

        const typeNames = data.types.map(type => type.type.name).join(', ');
        pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          hp: data.stats.find((s) => s.stat.name === 'hp').base_stat,
          attack: data.stats.find((s) => s.stat.name === 'attack').base_stat,
          defense: data.stats.find((s) => s.stat.name === 'defense').base_stat,
          speed: data.stats.find((s) => s.stat.name === 'speed').base_stat,
          height: data.height,
          weight: data.weight,
          types: typeNames
        };
      }
  
      res.status(200).json(pokemon);
    } catch (error) {
      res.status(404).json(error.message);
    }
  };


module.exports = getPokemonByName;