import axios from 'axios';

export function getPokemons() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/api/pokemons');
            return dispatch({
                type: 'GET_POKEMONS',
                payload: response.data
            })

        } catch (err) {
            console.log('There was an error loading the Pokemons!', err);
        }
    }
};

export function getTypes() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/api/types');
            return dispatch({
                type: 'GET_TYPES',
                payload: response.data
            })

        } catch (err) {
            console.log('There was an error loading the Pokemons types!', err)
        }
    }
};

export function getPokemonById(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/api/pokemons/${id}`);
            return dispatch({
                type: 'GET_POKEMON_BY_ID',
                payload: response.data
            })

        } catch (err) {
            console.log('There was an error loading the Pokemon!', err);
        }
    }
};


export function getPokemonByName(name) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/api/pokemons?name=${name}`);
            return dispatch({
                type: 'GET_POKEMON_BY_NAME',
                payload: response.data
            })

        } catch (err) {
            console.log('There was an error loading the Pokemon!', err);
        }
    }
};

export function createPokemon(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/api/pokemons', payload)
        return dispatch({
            type: 'CREATE_POKEMON',
            payload: response.data
        })
    }
}


export function filterBySource(payload) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload
    }
};

export function filterByType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
};