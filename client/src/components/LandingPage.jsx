import React from "react";
import { Link } from 'react-router-dom'


export default function LandingPage(){
    return(
        <div>
            <h1>Pokédex</h1>
            <Link to = '/home'>
                <button>
                Let´s Catch 'Em All! 
                </button>
            </Link>
        </div>
    )
}