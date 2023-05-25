const {Pokemon} = require('../db')
const {isUuid} = require ('./utils/functions')



const deletePokemonDB = async (req, res) => {
    const {id} = req.params
    const idIsUuid = isUuid(id)
    try {
        if (!idIsUuid) throw Error ('No se puede eliminar un pokemon de la api')
        const deletedPokemon = await Pokemon.destroy({
            where: { id }
          });
      
        if (deletedPokemon === 0) throw new Error('El Pokémon no existe en la base de datos');
          
        res.status(200).json({ message: 'Pokémon eliminado correctamente' });
    } catch (error) {
        res.status(404).json(error.message)
    }

}

module.exports = deletePokemonDB;