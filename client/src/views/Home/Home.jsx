import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { getPokemons } from "../../redux/actions";
import style from './Home.module.css'

const Home = ({pokemon})  => {
    const dispatch = useDispatch()
    const pokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 12;

    useEffect(() => {
        dispatch(getPokemons())
    }, [])

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handleAdvance = () => {
        if (currentPokemons.length == 12)setCurrentPage(currentPage + 1)
        // else setCurrentPage(currentPage + 1)
    }
    const handleBack = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
        
    }
    return (
        <div className={style.home}>
            <Cards pokemon={pokemon} pokemons={currentPokemons} />
            <div className={style.pagsControl}>
            <button className={style.prevYPostButtoms} onClick={handleBack}>{'<<'}</button>
            {currentPage - 1 > 0 &&<p className={style.prevYPost}>{currentPage - 1}</p>}
            <p className={style.page}>   {currentPage}   </p>
            <p className={style.prevYPost}> {currentPage + 1}</p>
            <button className={style.prevYPostButtoms} onClick={handleAdvance}>{'>>'}</button>
            </div>

        </div>
        
    )
}


export default Home;

