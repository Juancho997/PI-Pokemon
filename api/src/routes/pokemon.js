const { Router } = require('express');
const { getPokemons } =  require('../controllers/getPokemons');
const { getPokemonById } = require('../controllers/getPokemonById');
const { postPokemon} = require('../controllers/postPokemon.js');
const { deletePokemon } = require('../controllers/deletePokemon');

const router = Router();

router.get('/', getPokemons);

router.get('/:id', getPokemonById);

router.post('/', postPokemon);

router.delete('/:id', deletePokemon);

module.exports = router;