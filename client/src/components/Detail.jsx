import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from '../actions';
import HomeButton from "../common/HomeButton";


export default function Detail() {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPokemonById(id))
    }, []);

    const pokemon = useSelector(state => state.pokemonDetail);
    return (
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
                        <h3 id="hp">HP: {pokemon.hp} points.</h3>
                        <h3 id="atk">Attack: {pokemon.attack} points.</h3>
                        <h3 id="def">Defense: {pokemon.defense} points.</h3>
                        <h3 id="spd">Speed: {pokemon.speed} points.</h3>
                        <h3 id="he">Height: {pokemon.height} decimetres.</h3>
                        <h3 id="we">Weight: {pokemon.weight} hectograms.</h3>
                    </div>

                </div>

            </div>

        </div>
    )

}