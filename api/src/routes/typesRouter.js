const getTypes = require('../controllers/getTypes')


const { Router } = require('express')
const typesRouter = Router()


typesRouter.get('/', getTypes)



module.exports = typesRouter;

