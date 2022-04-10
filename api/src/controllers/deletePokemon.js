const { Pokemon } = require('../db');

module.exports = {
    deletePokemon: async (req, res, next) => {
        const { id } = req.params;

        try {

            await Pokemon.destroy({
                where: {
                    id: id
                }
            });
            return res.send('Pokemon succesfully deleted!')

        } catch (err) {
            next(err);
        }

    }
}