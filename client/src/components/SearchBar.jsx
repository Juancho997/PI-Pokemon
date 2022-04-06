import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../actions";


export default function SearchBar(){
    const dispatch = useDispatch();
    const [ name,setName ] = useState('')
    
    const handleInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPokemonByName(name)); //name === localState
        setName('');
    }
    
    return(
        <div>
            <input 
            type='text'
            placeholder="Search Pokémon"
            onChange={(e)=>handleInputChange(e)}
            />

            <button
            id="Button"
            type = 'submit'
            onClick={(e)=>handleSubmit(e)}>
            Find it!
            </button>
        </div>      

)};