import React from "react";


export default function Paginado({ pokemonsPerPage, allPokemons, paginado }){
    const pageNumbers = [];

    for(let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage) - 1; i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number}>
                            <button id="Button" href="#" onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}