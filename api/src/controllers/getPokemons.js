const { loadAllPokeData } = require('./index.js')

module.exports = {
    getPokemons: async (req, res, next) => {

        try {

            const pokeData = await loadAllPokeData();
            const { name } = req.query;

            if (name) {
                const pokemon = pokeData.filter(p => p.name.toLowerCase() === name.toLowerCase());
                if (pokemon.length === 0) {
                    return res.send('We couldn´t find any Pokémons with that name!')
                }
                return res.send(pokemon);
            }

            return res.send(pokeData);

        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}