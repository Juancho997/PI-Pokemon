const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const { getApiData, loadAllPokeData } = require('../controllers')

const router = Router();

router.get('/', async (req, res, next) => {

    try {

        const pokeData = await loadAllPokeData();
        const { name } = req.query;

        if (name) {
            const pokemon = pokeData.filter(p => p.name.toLowerCase() === name.toLowerCase());
            return res.send(pokemon); 
        }

        return res.send(pokeData);

    } catch (err) {
        console.log(err)
        next(err)
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const check = "-";
    let pokemon;

    try {

        if (id.includes(check)) {
            pokemon = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            });
            
        } else {
            const pokeData = await getApiData();
            const numId = Number(id)

            let found = pokeData.filter(p => p.id === numId);
            pokemon = found[0];
        }
        console.log(pokemon)
        return res.send(pokemon);

    } catch (err) {
        next(err)
    }

});

router.post('/', async (req, res, next) => {

    try {

        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

        const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });

        const dbTypes = await Type.findAll({
            where: {
                name: types
            }

        });

        await newPokemon.addType(dbTypes);

        res.send('New Pokemon created!'); //pokename -- sweetAlert lib


    } catch (err) {
        next(err);
    }




});




router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        console.log(id);

        await Pokemon.destroy({
            where: {
                id: id
            }
        });
        return res.send('Pokemon succesfully deleted!')

    } catch (err) {
        next(err);
    }

});















module.exports = router;