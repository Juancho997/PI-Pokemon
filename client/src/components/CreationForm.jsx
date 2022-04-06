import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPokemon, getTypes } from '../actions';

// MODULARRRRR
const validate = (pokeStats) => { //hacerlo mas específico en el back=> regex
    let errors = {};
    if (!pokeStats.name) {
        errors.name = 'A valid  name is required';
    } else if (!pokeStats.image) {
        errors.image = 'You must add a picture of your Pokémon.'
    } else if (!pokeStats.hp || pokeStats.hp <= 0) {
        errors.hp = 'Is your Pokémon even alive? Add some health points!'
    } else if (!pokeStats.attack || pokeStats.attack <= 0) {
        errors.attack = 'Your Pokémon doesn´t even make a scratch. Add some attack points.'
    } else if (!pokeStats.defense || pokeStats.defense <= 0) {
        errors.defense = 'Your Pokémon is too weak! Make it tougher.'
    } else if (!pokeStats.speed || pokeStats.speed <= 0) {
        errors.speed = 'Your Pokémon doesn´t even move! Give it some speed value.'
    } else if (!pokeStats.height || pokeStats.height <= 0) {
        errors.height = 'Your Pokémon is microscopic! Make it taller!.'
    } else if (!pokeStats.weight || pokeStats.weight <= 0) {
        errors.weight = 'Your Pokémon is ligther than a feather! You should add some pounds on it.'
    } else if (pokeStats.types.length === 0 || pokeStats.types[0] === "Type" || pokeStats.types[1] === "Type") {
        errors.types = 'Your Pokémon must have one or two types.'
    }

    return errors;
}

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
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

    // img preview
    const [img, setImg] = useState(null);
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef();

    const dispatch = useDispatch();

    const allTypes = useSelector(state => state.pokeTypes)
    function sortDesc(a, b) {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
        return 0
    };
    const allTypesSorted = allTypes.sort(sortDesc)

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    useEffect(() => {
        if (pokeStats.image) {

            setPreview(pokeStats.image);

        } else {
            setPreview(null);
        }

    }, [pokeStats.image])

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
        } else if (e.target.name === 'image') {

            setPokeStats({
                ...pokeStats,
                [e.target.name]: e.target.value
            });

            setErrors(validate({
                ...pokeStats,
                [e.target.name]: e.target.value
            }));

            if (pokeStats.image){
                setImg(pokeStats.image);

            } else {
                setImg(null)
            }
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

        <div id="divContainer">

            <Link to='/home'>
                <button className="titleButton"><img src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="img err" height="100px" /></button>
            </Link>


            <h1>Add your Pokémon to the Pokédex</h1>
            <div id="divForm">

                <form id="form" onSubmit={(e) => { handleSubmit(e) }}>
                    <div id="inputs">

                        <input
                            id="inputName"
                            placeholder="Name"
                            type='text'
                            name='name'
                            value={pokeStats.name}
                            onChange={(e) => handleChange(e)} />
                        {

                            errors.name && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.name}</p>
                                </div>
                            )
                        }


                        <input
                            id="inputHp"
                            placeholder="HP Points"
                            type='number'
                            name='hp'
                            value={pokeStats.hp}
                            onChange={(e) => handleChange(e)} />
                        {
                            errors.hp && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.hp}</p>
                                </div>

                            )
                        }

                        <input
                            id="inputAtk"
                            placeholder="Attack Points"
                            type='number'
                            name='attack'
                            value={pokeStats.attack}
                            onChange={(e) => handleChange(e)} />
                        {
                            errors.attack && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.attack}</p>
                                </div>
                            )
                        }

                        <input
                            id="inputDef"
                            placeholder="Defense Points"
                            type='number'
                            name='defense'
                            value={pokeStats.defense}
                            onChange={(e) => handleChange(e)} />
                        {
                            errors.defense && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.defense}</p>
                                </div>
                            )
                        }

                        <input
                            id="inputSpd"
                            placeholder="Speed Points"
                            type='number'
                            name='speed'
                            value={pokeStats.speed}
                            onChange={(e) => handleChange(e)} />
                        {
                            errors.speed && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.speed}</p>
                                </div>
                            )
                        }

                        <input
                            id="inputHe"
                            placeholder="Height (in decimeters)"
                            type='number'
                            name='height'
                            value={pokeStats.height}
                            onChange={(e) => handleChange(e)} />
                        {
                            errors.height && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.height}</p>
                                </div>
                            )
                        }

                        <input
                            id="inputWe"
                            placeholder="Weight (in hectograms)"
                            type='number'
                            name='weight'
                            value={pokeStats.weight}
                            onChange={(e) => handleChange(e)} />
                        {
                            errors.weight && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.weight}</p>
                                </div>
                            )
                        }

                        <select id="inputSel" name='types' onChange={(e) => handleChange(e)}>
                            <option>Type</option>
                            {
                                allTypes && allTypesSorted.map(t => {
                                    return <option key={t.name} id={t.id} value={t.name}>{capitalize(t.name)}</option>
                                })

                            }
                        </select>
                        {
                            errors.types && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.types}</p>
                                </div>
                            )
                        }

                        {
                            pokeStats.types.map(t =>
                                <div  key={t}>
                                    {/* <p style={{color: "white"}} className="types" >{capitalize(t)}</p> */}
                                    <button id="Button" onClick={() => handleDelete(t)}>Remove {capitalize(t)} type</button>
                                </div>)
                        }
                    </div>
                    <div div="imgDiv">
                        <input
                            id="imgInput"
                            placeholder="Image URL"
                            type='text'
                            name='image'
                            ref={fileInputRef}
                            accept="image/*"
                            value={pokeStats.image}
                            onChange={(e) => handleChange(e)} />
                        {
                            errors.image && (
                                <div className="errorDiv">
                                    <p className='error'>{errors.image}</p>
                                </div>
                            )
                        }
                        {
                            preview && 
                                <div id="previewImgDiv">
                                    <img
                                        id="previewImg"
                                        src={pokeStats.image}
                                        onClick={() => {
                                            setImg(null);
                                            setPokeStats({
                                                ...pokeStats,
                                                image: ""
                                            });
                                        }}
                                    />
                                    <p id="previewText">Click the image to change it</p>
                                </div>
                        }
                          
                    </div>
                    {
                        pokeStats.name && pokeStats.image && pokeStats.hp && pokeStats.attack && pokeStats.defense && pokeStats.speed && pokeStats.height && pokeStats.weight && pokeStats.types.length > 0 ?
                            <div id="divCreateBttn">
                                <button id="Button" type='submit'>Ok!</button>
                            </div>

                            :

                            <div id="waitingImg"><img src="https://thumbs.gfycat.com/DampSpanishCleanerwrasse-size_restricted.gif" alt="waiting pokeStats!" />
                            </div>
                    }

                </form>
            </div>


        </div>

    )
};