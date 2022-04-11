const { Router } = require('express');
const router = Router();

const pokeRouter = require('../routes/pokemon.js')
const typeRouter = require('../routes/type.js')

router.use('/pokemons', pokeRouter);
router.use('/types', typeRouter);

module.exports = router;