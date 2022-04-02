const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const pokeRouter = require('../routes/Pokemon.js')
const typeRouter = require('../routes/Type.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokeRouter);
router.use('/types', typeRouter);


module.exports = router;
