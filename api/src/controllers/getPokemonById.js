const { getApiData } = require('./index.js')
const { Pokemon, Type } = require('../db');


module.exports = {
    getPokemonById : async (req, res, next) => {
        const { id } = req.params;
        const check = "-";
        let pokemon;
    
        try {
    
            if (id.includes(check)) {
                let found = await Pokemon.findByPk(id, {
                    include: {
                        model: Type,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        }
                    }
                });

                pokemon = {
                    id: found.dataValues.id,
                    name: found.dataValues.name,
                    image : found.dataValues.image,
                    hp: found.dataValues.hp,
                    attack: found.dataValues.attack,
                    defense : found.dataValues.defense,
                    speed: found.dataValues.speed,
                    height : found.dataValues.height,
                    weight : found.dataValues.weight,
                    types : found.dataValues.types.map(type => type.dataValues.name)
                }
                console.log(pokemon)
                
                console.log(found.dataValues.types)
                
            } else {
                const pokeData = await getApiData();
                const numId = Number(id)
    
                let found = pokeData.filter(p => p.id === numId);
                pokemon = found[0];
            }
            return res.send(pokemon);
    
        } catch (err) {
            next(err)
        }
    
    }
}