const { Pokemon, Type } = require('../db');

    module.exports = {
        postPokemon : async (req, res, next) => {

            try {
        
                const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
        
                const same = await Pokemon.findAll({
                    where: {
                      name: name
                    }
                  });
        
                if(same.length === 0){
                    const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });
            
                    const dbTypes = await Type.findAll({
                        where: {
                            name: types
                        }
            
                    });
        
                    await newPokemon.addType(dbTypes);
            
                    res.send(`${name} created!`); // sweetAlert lib
                } else {
                    res.send(`${name} it´s already created! You should pick another name`)
                } 
        
            } catch (err) {
                next(err);
            }    
        }
    }