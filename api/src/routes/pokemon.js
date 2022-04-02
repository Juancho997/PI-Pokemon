const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const axios = require('axios');

const router = Router();

// [ ] GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal
// Solo hago el llamado a la api, ver como guardar todo en DB para practicar


// 


function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

const getApiData = async () => {
    const resp = await axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=40")
        .then((data) => {
            return data.data.results;
        })
        .then((data) => {
            return Promise.all(data.map((res) => axios.get(res.url)));
        })
        .then((data) => {
            return data.map((res) => res.data);
        });
    let pokeData = resp.map((result) => {
        return {
            id: result.id,
            name: capitalize(result.name),
            types: result.types.map((t) => t.type.name),
            image: result.sprites.front_default,
            hp: result.stats[0].base_stat,
            attack: result.stats[1].base_stat,
            defense: result.stats[2].base_stat,
            speed: result.stats[3].base_stat,
            height: result.height,
            weight: result.weight,
        };
    });
    return pokeData;
};


const getDbData = async () => {
    try {
        const
            pokeData = await Pokemon.findAll({
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            });

        return pokeData;
    } catch (err) {
        console.log(err)
    }
};

const loadAllPokeData = async () => {
    const pokeApi = await getApiData();
    const pokeDb = await getDbData();

    const allPokeData = [...pokeApi, ...pokeDb];

    return allPokeData;
}
// 

// [ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado


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




// [ ] GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

router.get('/:id', async (req, res, next) => {
    const { id } = req.params; // typeof => string
    const check = "-"; // => UUID
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
            pokemon = found[0]; //avoid [{}], breaks id search

        }
        console.log(pokemon)
        return res.send(pokemon);

    } catch (err) {
        next(err)
    }

});


// [ ] POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos
// distinto a los traídos de la Api => otras props

router.post('/', async (req, res, next) => {

    try {

        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

        // if (!name) return res.json({ info: "El nombre es obligatorio" }); => copypaste front

        if (!name) return res.send({ info: 'A name is required' });
        if (!image) return res.send({ info: 'You should add an image' });
        if (!hp) return res.send({ info: 'This property must have a value' });
        if (!attack) return res.send({ info: 'This property must have a value' });
        if (!defense) return res.send({ info: 'This property must have a value' });
        if (!speed) return res.send({ info: 'This property must have a value' });
        if (!height) return res.send({ info: 'This property must have a value' });
        if (!weight) return res.send({ info: 'This property must have a value' });
        if (!types) return res.send({ info: 'This property must have a value' });

        const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });

        const dbTypes = await Type.findAll({
            where: {
                name: types
            }

        });

        await newPokemon.addType(dbTypes);

        res.send('New Pokemon created!');


    } catch (err) {
        next(err);
    }




});




// OK! => Ver como enlazar otra ruta para que no quede en el aire
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
        return res.redirect('/'); {/*redirigir desde el front, responder con json o 200 */ }

    } catch (err) {
        next(err);
    }

});















module.exports = router;