import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPokemon, getTypes } from '../actions';


const validate = (pokeStats) => {
    let errors = {};
    if (!pokeStats.name) {
        errors.name = 'A valid  name is required';
    } else if (!pokeStats.image) {
        errors.image = 'You must add a picture of your Pokémon.'
    } else if (!pokeStats.hp ) {
        errors.hp = 'Is your Pokémon even alive? Add some health points!'
    } else if (!pokeStats.attack) {
        errors.attack = 'Your Pokémon doesn´t even make a scratch. Add some attack points.'
    } else if (!pokeStats.defense) {
        errors.defense = 'Your Pokémon is too weak! Make it tougher.'
    } else if (!pokeStats.speed) {
        errors.speed = 'Your Pokémon doesn´t even move! Give it some speed value.'
    } else if (!pokeStats.height) {
        errors.height = 'Your Pokémon is microscopic! Make it taller!.'
    } else if (!pokeStats.weight) {
        errors.weight = 'Your Pokémon is ligther than a feather! You should add some pounds on it.'
    } else if (pokeStats.types.length === 0){
        errors.types = 'Your Pokémon must have at least one type.'
    }

    return errors;
}

export default function Create() {

    const baseStats = {
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

    const [pokeStats, setPokeStats] = useState(baseStats);

    const [errors, setErrors] = useState({});


    const dispatch = useDispatch();

    const allTypes = useSelector(state => state.pokeTypes)
    function sortDesc(a, b) {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
        return 0
    };
    const allTypesSorted = allTypes.sort(sortDesc)

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    const handleChange = (e) => {

        if (e.target.name === 'types') {
            setPokeStats({
                ...pokeStats,
                [e.target.name]: [...pokeStats.types, e.target.value]
            });
            setErrors(validate({
                ...pokeStats,
                [e.target.name]: [...pokeStats.types, e.target.value]
            }))
        } else {
            setPokeStats({
                ...pokeStats,
                [e.target.name]: e.target.value
            });
            setErrors(validate({
                ...pokeStats,
                [e.target.name]: e.target.value
            }))
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPokemon(pokeStats));
        console.log(pokeStats)
        setPokeStats(baseStats);
        alert('Pokémon created');
    };

    const handleDelete = (el) => {
        setPokeStats({
            ...pokeStats,
            types: pokeStats.types.filter(t => t !== el)
        })
    }



    return (

        <div>
            <h1>Create your Pokémon</h1>

            <form onSubmit={(e) => { handleSubmit(e) }}>

                <label>Name : </label>
                <input
                    type='text'
                    name='name'
                    value={pokeStats.name}
                    onChange={(e) => handleChange(e)} />
                {
                    errors.name && (
                        <p className='error'>{errors.name}</p>
                    )
                }

                <label>Image : </label>
                <input
                    type='text'
                    name='image'
                    value={pokeStats.image}
                    onChange={(e) => handleChange(e)} />
                {
                    errors.image && (
                        <p className='error'>{errors.image}</p>
                    )
                }

                <label>HP : </label>
                <input
                    type='number'
                    name='hp'
                    value={pokeStats.hp}
                    onChange={(e) => handleChange(e)} />
                {
                    errors.hp && (
                        <p className='error'>{errors.hp}</p>
                    )
                }

                <label>Attack : </label>
                <input
                    type='number'
                    name='attack'
                    value={pokeStats.attack}
                    onChange={(e) => handleChange(e)} />
                {
                    errors.attack && (
                        <p className='error'>{errors.attack}</p>
                    )
                }

                <label>Defense : </label>
                <input
                    type='number'
                    name='defense'
                    value={pokeStats.defense}
                    onChange={(e) => handleChange(e)} />
                {
                    errors.defense && (
                        <p className='error'>{errors.defense}</p>
                    )
                }

                <label>Speed : </label>
                <input
                    type='number'
                    name='speed'
                    value={pokeStats.speed}
                    onChange={(e) => handleChange(e)} />
                {
                    errors.speed && (
                        <p className='error'>{errors.speed}</p>
                    )
                }

                <label>Height (in decimeters): </label>
                <input
                    type='number'
                    name='height'
                    value={pokeStats.height}
                    onChange={(e) => handleChange(e)} />
                {
                    errors.height && (
                        <p className='error'>{errors.height}</p>
                    )
                }

                <label>Weight (in hectograms) : </label>
                <input
                    type='number'
                    name='weight'
                    value={pokeStats.weight}
                    onChange={(e) => handleChange(e)} />
                {
                    errors.weight && (
                        <p className='error'>{errors.weight}</p>
                    )
                }

                <label>Type: </label>
                <select name='types' onChange={(e) => handleChange(e)}>
                    <option>Select</option>
                    {
                        allTypes && allTypesSorted.map(t => {
                            return <option key={t.name} id={t.id} value={t.name}>{t.name}</option>
                        })

                    }
                </select>
                {
                    errors.types && (
                        <p className='error'>{errors.types}</p>
                    )
                }

                {
                    pokeStats.types.map(t =>
                        <div key={t}>
                            <p >{t}</p>
                            <button onClick={() => handleDelete(t)}>x</button>
                        </div>)
                }

                <div>
                    <button type='submit'>Ok!</button>
                </div>

            </form>

            <Link to='/home'>
                <button>Home</button>
            </Link>
        </div>

    )
};