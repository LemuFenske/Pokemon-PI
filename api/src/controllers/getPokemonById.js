const axios = require ('axios')
const {Pokemon,Type} = require('../db')
const URL = 'https://pokeapi.co/api/v2/pokemon'



const isUuid = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}



const getPokemonById = async (req, res) => {
    try {
        const {id} = req.params
        const idIsUuid = isUuid(id)
        if (idIsUuid)  {
            const dbResults = await Pokemon.findByPk(id, {
                include: {
                  model: Type,
                  through: { attributes: [] } // Excluir la tabla intermedia
                },
                attributes: { exclude: ['PokemonType'] }
              });
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
           return res.status(200).json(dbPokemon)
        
            
        }
        const {data} = await axios (`${URL}/${id}`)
        if (!data.name) {
            
        }
        const typeNames = data.types.map(type => type.type.name).join(', ');
        const pokemon = {
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
        res.status(200).json(pokemon)
        
        
    } catch (error) {
        res.status(404).json(error.message)
    }
    
}
// try {
//     const name = req.query.name.toLowerCase();
//     const {data} = await axios (`${URL}/${name}`)
//     if (!data.name) throw Error ('Ese nombre no existe')
//     const pokemon = {
//         id: data.id,
//         name: data.name,
//         image: data.sprites.front_default,
//         hp: data.stats.find(s => s.stat.name === 'hp').base_stat,
//         attack: data.stats.find(s => s.stat.name === 'attack').base_stat,
//         defense: data.stats.find(s => s.stat.name === 'defense').base_stat,
//         speed: data.stats.find(s => s.stat.name === 'speed').base_stat,
//         height: data.height,
//         weight: data.weight,
//         types: data.types
//         }
//         // { name: { $regex: name, $options: 'i' } }
//     const dbResults = await Pokemon.findOne( { name: { $regex: name, $options: 'i' } })
//     const pokemonsByName = [dbResults, pokemon]
//     res.status(200).json(pokemonsByName)
// } catch (error) {
//     res.status(404).json(error.message)
// }

module.exports = getPokemonById;