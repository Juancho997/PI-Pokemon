const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db');
const { capitalize } = require('../controllers');

const router = Router();

// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


router.get('/', async (req, res, next) => {

    try {
        const check = await Type.findAll();
        

        if (check.length > 0) {
            res.send(check);
        } else {

            const apiTypes = await axios.get('https://pokeapi.co/api/v2/type/')

            const pokeTypes = apiTypes.data.results.map(type => {
                return {
                    name:capitalize(type.name)
                }
            });

            const loadPokeTypes = await Type.bulkCreate(pokeTypes);
            return res.send(loadPokeTypes);

        }

    } catch (err) {
        next(err)
    }

});


module.exports = router;