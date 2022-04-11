import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getPokemons, getTypes } from '../actions';
import { validate, sortDesc, baseStats } from '../controllers';
import swal from 'sweetalert';
import HomeButton from "../common/HomeButton";
import Loader from "../common/Loader";


export default function Create() {

    const [pokeStats, setPokeStats] = useState(baseStats);
    const [errors, setErrors] = useState({});

    const allTypes = useSelector(state => state.pokeTypes)
    const allTypesSorted = allTypes.sort(sortDesc)

    const allPokemons = useSelector(state => state.allPokemons)

    function dupName(name) {
        const found = allPokemons.filter(poke => poke.name === name)
        return found
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, []);


    const [img, setImg] = useState(null);
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef();

    useEffect(() => {
        if (pokeStats.image) {
            setPreview(pokeStats.image);
        } else {
            setPreview(null);
        }
    }, [pokeStats.image])

    const handleChange = (e) => {
        setPokeStats({
            ...pokeStats,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...pokeStats,
            [e.target.name]: e.target.value
        }))
    }

    const handleTypesChange = (e) => {
        setPokeStats({
            ...pokeStats,
            [e.target.name]: [...pokeStats.types, e.target.value]
        });
        setErrors(validate({
            ...pokeStats,
            [e.target.name]: [...pokeStats.types, e.target.value]
        }))

    }

    const handleImgChange = (e) => {
        setPokeStats({
            ...pokeStats,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...pokeStats,
            [e.target.name]: e.target.value
        }));

        if (pokeStats.image) {
            setImg(pokeStats.image);


        } else {
            setImg(null)
        }
    }

    const handleNameChange = (e) => {
        setPokeStats({
            ...pokeStats,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...pokeStats,
            [e.target.name]: e.target.value
        }, dupName(e.target.value)
        ))

    }



    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPokemon(pokeStats));
        setPokeStats(baseStats);
        swal({
            title: `${pokeStats.name} created!`,
            icon: "success",
            button: "Ok!"
        }).then(response => {
            if (response) {
                navigate(-1);
            }
        })
    };

    const handleDelete = (el) => {
        setPokeStats({
            ...pokeStats,
            types: pokeStats.types.filter(t => t !== el)
        })
    }

    return (

        <div>

            {
                allPokemons.length === 0 ? <Loader /> :

                    <div id="divContainer">

                        <HomeButton />

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
                                        onChange={(e) => handleNameChange(e)} />
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

                                    <select id="inputSel" name='types' onChange={(e) => handleTypesChange(e)}>
                                        <option>Type</option>
                                        {
                                            allTypes && allTypesSorted.map(t => {
                                                return <option key={t.name} id={t.id} value={t.name}>{t.name}</option>
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
                                            <div key={t}>
                                                <button id="Button" onClick={() => handleDelete(t)}>Remove {t} type</button>
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
                                        onChange={(e) => handleImgChange(e)} />
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
                                                alt="previewImg"
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
                                    pokeStats.name &&
                                        pokeStats.image &&
                                        pokeStats.hp &&
                                        pokeStats.attack &&
                                        pokeStats.defense &&
                                        pokeStats.speed &&
                                        pokeStats.height &&
                                        pokeStats.weight &&
                                        pokeStats.types.length > 0 &&
                                        pokeStats.types.length <= 2 ?
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
            }
        </div>

    )
};