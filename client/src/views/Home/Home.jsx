import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { getPokemons } from "../../redux/actions";
import style from './Home.module.css'

const Home = ({pokemon, setPokemon})  => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPokemons())
    }, [])


    return (
        <div className={style.home}>
            <Cards  pokemon={pokemon} setPokemon={setPokemon}/>
        </div>
        
    )
}


export default Home;

