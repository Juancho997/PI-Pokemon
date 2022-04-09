// getApiData, loadAllPokeData => export
// acomodar para que no se choquen los llamados
const axios = require("axios");
const { Pokemon, Type } = require("../db");

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

async function getDbData() {
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


async function getApiData() {
    const resp = await axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=40")
        .then((data) => {
            return data.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
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






module.exports = {

    capitalize: capitalize,
    
    getApiData: getApiData,

    loadAllPokeData: async function () {
        const pokeApi = await getApiData();
        const pokeDb = await getDbData();

        const allPokeData = [...pokeApi, ...pokeDb];

        return allPokeData;
    }


};


















