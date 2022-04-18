const axios = require('axios');
const { Type } = require('../db');
const { capitalize } = require('./index.js');

module.exports = {
    getTypes : async (req, res, next) => {

        try {
            const check = await Type.findAll();
            
    
            if (check.length > 0) {
                const mapedTypes = check.map(type => type.name)
                return res.send(mapedTypes);
            } else {
    
                const apiTypes = await axios.get('https://pokeapi.co/api/v2/type/')
    
                const pokeTypes = apiTypes.data.results.map(type => {
                    return {
                        name:capitalize(type.name)
                    }
                });
    
                const loadPokeTypes = await Type.bulkCreate(pokeTypes);
                const mapedTypes = loadPokeTypes.map(type => type.name)
                return res.send(mapedTypes);
    
            }
    
        } catch (err) {
            next(err)
        }
    
    }
}
