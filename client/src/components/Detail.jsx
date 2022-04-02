import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from '../actions';

//render types and id number
export default function Detail() {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPokemonById(id))
    }, []);

    const pokemon = useSelector(state => state.pokemonDetail);
    return (
        <div>
            <div>
                <h1>{pokemon.name}</h1>
                <h4>ID: {pokemon.id}</h4>
                <img src={pokemon.image} width='400' heigth='400' />
                <div>
                    <h2>Stats</h2>
                    <h3>HP: {pokemon.hp} points.</h3>
                    <h3>Attack: {pokemon.attack} points.</h3>
                    <h3>Defense: {pokemon.defense} points.</h3>
                    <h3>Speed: {pokemon.speed} points.</h3>
                    <h3>Height: {pokemon.height} decimetres.</h3>
                    <h3>Weight: {pokemon.weight} hectograms.</h3>
                </div>
            </div>

            <Link to='/home'>
                <button>Main Menu</button>
            </Link>
        </div>
    )

}