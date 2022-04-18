import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, deletePokemon, clearDetail } from '../actions';
import HomeButton from "../common/HomeButton";
import Loader from "../common/Loader";
import Swal from 'sweetalert2';

export default function Detail() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearDetail())
        dispatch(getPokemonById(id))
    }, []);

    const pokemon = useSelector(state => state.pokemonDetail);

    const handleDeletePokemon = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Delete Pokémon",
            text: "Are you sure you want to delete this Pokémon? This action cannot be undone",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
        })

            .then(response => {
                if (response.isConfirmed) {
                    Swal.fire({
                        text: "Pokémon successfully deleted",
                        icon: "success"
                    })
                    dispatch(deletePokemon(pokemon.id));
                    navigate('/home');
                }

            })
    };

    return (

        <div>

            {pokemon.length === 0 ? <Loader /> :
                <div id="detailDiv">

                    <HomeButton />

                    <div id="detailContainer">

                        <div id="divDetailImg">
                            <img src={pokemon.image} width='400' heigth='400' />
                        </div>

                        <div id="divDetailInfo">

                            <div id="detailTitle">
                                <h1>{pokemon.name}</h1>
                                <h5>ID: {pokemon.id}</h5>
                            </div>

                            <div id="detailStats">
                                <h2>Stats</h2>
                                <div id="detailStatsInfo">
                                    <h3 id="hp">HP: {pokemon.hp} points.</h3>
                                    <h3 id="atk">Attack: {pokemon.attack} points.</h3>
                                    <h3 id="def">Defense: {pokemon.defense} points.</h3>
                                    <h3 id="spd">Speed: {pokemon.speed} points.</h3>
                                    <h3 id="he">Height: {pokemon.height} decimetres.</h3>
                                    <h3 id="we">Weight: {pokemon.weight} hectograms.</h3>
                                </div>
                            </div>

                            <div>
                                <h2 id="detailStatsInfo">Types</h2>
                                <div id="divTypes">
                                {
                                    pokemon.types &&
                                    pokemon.types.map(t => {
                                        return (
                                            <h4 key={t}>{t}</h4>
                                        )
                                    })
                                }
                                </div>
                            </div>

                        </div>
                        {
                            id.includes("-") && <button id="Button" onClick={(e) => handleDeletePokemon(e)}>Delete Pokémon</button>
                        }

                    </div>

                </div>
            }
        </div>
    )
}