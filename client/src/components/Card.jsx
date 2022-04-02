import React from 'react';
import { Link } from 'react-router-dom';


export default function Card({ id, name, image, types }) {
    return (

        <div>
            <img src={image} width='200' heigth='200' alt='Img not found' />
            <Link to={`/pokemons/${id}`}>
                <h1>{name}</h1>
            </Link>
            {
                typeof types[0] === 'string' ?
                    types.map(t => {
                        return <li key={t}>{t}</li>
                    })
                    :
                    types.map(t => {
                        return <li key={t.name}>{t.name}</li>
                    })
            }
        </div>


    )
}