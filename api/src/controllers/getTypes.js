const axios = require ('axios')
const URL = "https://pokeapi.co/api/v2/type"
const {Type} = require('../db')


const getAllTypes = async () => {
    const {data} = await axios(URL)
    return data.results
}

// const typeCreator = async (name, id) => {
//     const newType = await Type.create({name, id})
//     return newType;
// }


const getTypes = async (req, res) => {
    try {
      const types = await getAllTypes();
  
      // Verificar si los tipos ya existen en la base de datos
      for (const type of types) {
        await Type.findOrCreate({
          where: { name: type.name },
          defaults: { name: type.name },
        });
      }
  
      const allTypes = await Type.findAll();
      res.status(200).json(allTypes);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  
  module.exports = getTypes;

  
  
  
  
  
  
  