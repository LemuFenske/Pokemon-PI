const {Pokemon} = require ('../db')
const {isUuid} = require ('./utils/functions')

const updatePokemonDB = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const idIsUuid = isUuid(id)
    try {
        if (!idIsUuid) throw Error ('No se puede modificar un pokemon de la api')

       
        const updatedPokemon = await Pokemon.update(
            { name }, // lo que tiene que actualizar
            { where: { id } } //condicion
        );
  
        if (updatedPokemon[0] === 0) throw new Error('El Pokémon no existe en la base de datos');

  
        res.status(200).json({ message: 'Nombre del Pokémon actualizado correctamente' });
        
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = updatePokemonDB;