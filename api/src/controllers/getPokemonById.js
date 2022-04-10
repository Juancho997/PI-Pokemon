const { getApiData } = require('./index.js')
const { Pokemon, Type } = require('../db');


module.exports = {
    getPokemonById : async (req, res, next) => {
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
    
    }
}