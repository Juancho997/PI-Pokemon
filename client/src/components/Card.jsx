import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../controllers';


export default function Card({ id, name, image, types }) {
    return (

        <div id='cardContainer'>
            <div id="cardImgDiv" >
                <img id="cardImg" src={image} width='200' heigth='200' alt='Img not found' />
            </div>

            <Link to={`/pokemons/${id}`} id="cardName">
                <h3>{name}</h3>
            </Link>
            <div id="cardTypes">
            {
                typeof types[0] === 'string' ?
                    types.map(t => {
                        return <h4 key={t}>{capitalize(t)}</h4>
                    })
                    :
                    types.map(t => {
                        return <h4 key={t.name}>{capitalize(t.name)}</h4>
                    })
            }
            </div>
        </div>


    )
}