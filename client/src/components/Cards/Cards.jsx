import Card from "../Card/Card"
import style from './Cards.module.css'
import { useSelector} from 'react-redux'
import { useState } from "react"
import Filters from "../Filters/Filters"

const  Cards = ({pokemon, setPokemon}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 12;
    const pokemons = useSelector(state => state.pokemons)
    const pokemonsFiltered = useSelector(state => state.pokemonsFiltered)

    

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handleAdvance = () => {
        if (currentPokemons.length === 12)setCurrentPage(currentPage + 1)
    }
    const handleBack = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
        
    }
    const handleClean = () => {
      setPokemon([])
    }


    return (
      <div className={style.cards}>
        {pokemon.length > 0 && <div className={style.results}>
          <h3 className={style.resultsTitle}>Resultados de tu búsqueda:</h3>
          <button className={style.resultsButton} onClick={handleClean}>Eliminar</button>
          </div> }
        <div className={style.searchCard}>
          {pokemon.map(({ id, name, image, types }) => (
            <Card key={id} id={id} name={name} image={image} types={types} />
          ))}
        </div>
        {!pokemons.length ? (
          <div className={style.loader}> 
            <h4>Un momento, por favor...</h4>
            <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Cargando..." />
          </div>
        ) : (
          <>
            <div className={style.filters}>
              <Filters/>
            </div>
            {pokemonsFiltered.length ? (
              <>
                {pokemonsFiltered.map(({ id, name, image, types }) => (
                  <Card key={id} id={id} name={name} image={image} types={types} />
                ))}
              </>
            ) : (
              <>
                {currentPokemons.map(({ id, name, image, types }) => (
                  <Card key={id} id={id} name={name} image={image} types={types} />
                ))}
                <div className={style.pagsControl}>
                  <button className={style.prevYPostButtoms} onClick={handleBack}>{'<<'}</button>
                  {currentPage - 1 > 0 && <p className={style.prevYPost}>{currentPage - 1}</p>}
                  <p className={style.page}>{currentPage}</p>
                  {currentPokemons.length === pokemonPerPage && <p className={style.prevYPost}>{currentPage + 1}</p>}
                  <button className={style.prevYPostButtoms} onClick={handleAdvance}>{'>>'}</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
   
}

export default Cards;