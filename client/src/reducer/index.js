const initialState = {
    allPokemons: [],
    loadedPokemons: [],
    pokemonDetail: [],
    pokeTypes: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_POKEMONS':
            return {
                ...state,
                allPokemons: action.payload,
                loadedPokemons: action.payload
            };

        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                loadedPokemons: action.payload
            }

        case 'GET_POKEMON_BY_ID':
            return {
                ...state,
                pokemonDetail: action.payload
            };
        
        case 'CREATE_POKEMON':
            return {
                ...state,
            }
        case 'DELETE_POKEMON':
            return{
                ...state
            }

        case 'GET_TYPES':
            return {
                ...state,
                pokeTypes: action.payload
            };

        case 'FILTER_BY_SOURCE':
            const allPokemons = state.allPokemons;
            const createdFilter = action.payload === 'db' ? allPokemons.filter(p => p.createdByUser) : allPokemons.filter(p => !p.createdByUser)
            return {
                ...state,
                loadedPokemons: action.payload === 'All' ? allPokemons : createdFilter
            };

        case 'FILTER_BY_TYPE':
            const allPokemonTypes = state.allPokemons;
            const filterTypes = action.payload === 'All' ? allPokemonTypes : allPokemonTypes.filter(pk => pk.types.includes(action.payload) || pk.types.name === action.payload)
            return {
                ...state,
                loadedPokemons: filterTypes
            };

        case 'ORDER_BY_NAME':
            let sortedPokemonsAlph = action.payload === 'AZ' ?
                state.loadedPokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return - 1;
                    }
                    return 0;
                }) :
                state.loadedPokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                loadedPokemons: sortedPokemonsAlph
            };

        case 'ORDER_BY_ATTACK':
            let sortedPokemonsAtk = action.payload === 'atkAsc' ?
                state.loadedPokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return - 1;
                    }
                    return 0;
                }) :
                state.loadedPokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                loadedPokemons: sortedPokemonsAtk
            };



        default:
            return state;
    }
}