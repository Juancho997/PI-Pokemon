const { Router } = require('express');
const router = Router();

const pokeRouter = require('../routes/Pokemon.js')
const typeRouter = require('../routes/Type.js')

router.use('/pokemons', pokeRouter);
router.use('/types', typeRouter);

module.exports = router;