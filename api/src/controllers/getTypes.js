const {Type} = require('../db')
const {getAllTypes} = require('./utils/functions')



const getTypes = async (req, res) => {
    try {
      const types = await getAllTypes();
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