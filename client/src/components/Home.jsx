import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons, getTypes, filterBySource, filterByType, orderByName, orderByAttack } from '../actions';

import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import Loader from '../common/Loader';


export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.loadedPokemons);
    const allTypes = useSelector((state) => state.pokeTypes)

    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const [order, setOrder] = useState('');
    let currentPokemons

    typeof  allPokemons === 'string' ? currentPokemons = [{
        //mensaje de error en formato  objeto para poder mapearlo
        id: '- -',
        name : allPokemons,
        image: 'https://c.tenor.com/DHGvsLhTOowAAAAC/meme-pikachu.gif',
        types: ['-', '-']
     }] :
     currentPokemons = allPokemons.slice(indexOfirstPokemon, indexOfLastPokemon)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes())
    }, [dispatch]);

    const handleFilterType = (e) => {
        dispatch(filterByType(e.target.value));
    };


    const handleFilterSource = (e) => {
        dispatch(filterBySource(e.target.value));
    };

    const handleSortAZ = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`)
    };

    const handleSortAttack = (e) => {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${e.target.value}`)
    };

    return (
        <div>

            
        <div className="container">

            <div>
                <button className="titleButton" onClick={(e) => handleClick(e)}>
                    <img 
                    src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" 
                    alt="img err" 
                    height="100px" />
                </button>
            </div>


            <div id='filsortContainer'>

                <select onChange={e => handleSortAZ(e)} >
                    <option value="All">Alphabetical</option>
                    <option value="AZ">A to Z</option>
                    <option value="ZA">Z to A</option>
                </select>

                <select onChange={e => handleSortAttack(e)}>
                    <option value="All">Attack</option>
                    <option value="atkDesc">More attack points</option>
                    <option value="atkAsc">Less attack points</option>
                </select>

                <select onChange={e => handleFilterType(e)}>
                    <option value='All'>Types</option>
                    {
                        allTypes ?
                            allTypes.map(t => {
                                return (
                                    <option key={t.name} value={t.name.toLowerCase()}>{t.name}</option>
                                )
                            })
                            :
                            <option>No types loaded</option>

                    }
                </select>

                <select onChange={e => handleFilterSource(e)}>
                    <option value="All">All</option>
                    <option value="api">Stored in Api</option>
                    <option value="db">Created By User</option>
                </select>
            </div>

            <div className='actionContainer'>
                
                <div>
                    <SearchBar />
                </div>
                
                <div>
                    <Link to='/create' >
                        <button id='Button'>Create your Pokémon</button>
                    </Link>
                </div>

            </div>


            <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length} //need numeric value
                paginado={paginado}
            />
        {
                allPokemons.length === 0 ? <Loader /> :
            <div id="Cards">
            {
                currentPokemons?.map(p => {
                    return <Card
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        image={p.image}
                        types={p.types} />
                })
            }
            </div>

        }
    </div>
        



        </div>
    )
}