// CREATIONFORM.JSX
export function validate(pokeStats) {
    let errors = {};
    let genericErr = 'That number it´s game breaking! It should be less than ';
    

    if (!pokeStats.name || !pokeStats.name.match(/^[a-zA-Z]+$/)) {
        errors.name = 'A valid  name is required';

    } else if (!pokeStats.image || !pokeStats.image.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
        errors.image = 'You must add a picture of your Pokémon.'


    } else if (!pokeStats.hp || pokeStats.hp <= 0) {
        errors.hp = 'Is your Pokémon even alive? Add some health points!'
    } else if (pokeStats.hp > 100) {
        errors.hp = genericErr + 100

    } else if (!pokeStats.attack || pokeStats.attack <= 0) {
        errors.attack = 'Your Pokémon doesn´t even make a scratch. Add some attack points.'
    } else if (pokeStats.attack > 100) {
        errors.attack = genericErr + 100

    } else if (!pokeStats.defense || pokeStats.defense <= 0) {
        errors.defense = 'Your Pokémon is too weak! Make it tougher.'
    } else if (pokeStats.defense > 100) {
        errors.defense = genericErr + 100

    } else if (!pokeStats.speed || pokeStats.speed <= 0) {
        errors.speed = 'Your Pokémon doesn´t even move! Give it some speed value.'
    } else if (pokeStats.speed > 100) {
        errors.speed = genericErr + 100

    } else if (!pokeStats.height || pokeStats.height <= 0) {
        errors.height = 'Your Pokémon is microscopic! Make it taller!.'
    } else if (pokeStats.height > 20) {
        errors.height = genericErr + 20


    } else if (!pokeStats.weight || pokeStats.weight <= 0) {
        errors.weight = 'Your Pokémon is ligther than a feather! You should add some pounds on it.'
    } else if (pokeStats.weight > 1000) {
        errors.weight = genericErr + 1000


    } else if (pokeStats.types.length === 0 || pokeStats.types.length > 2 || pokeStats.types[0] === "Type" || pokeStats.types[1] === "Type") {
        errors.types = 'Your Pokémon must have one or two types.'
    }
    return errors;
};

export const baseStats = {
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: []
}


export function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
};


export function sortDesc(a, b) {
    if (a.name < b.name) return -1
    else if (a.name > b.name) return 1
    return 0
};



