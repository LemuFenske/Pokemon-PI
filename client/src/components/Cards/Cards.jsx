import Card from "../Card/Card"
import style from './Cards.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from "react"
import axios from "axios"
import {cleanFilters, filterPokemonsOrigin, filterPokemonsType, orderPokemons} from '../../redux/actions'

const  Cards = ({pokemon}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [types, setTypes] = useState([])
    const pokemonPerPage = 12;
    const pokemons = useSelector(state => state.pokemons)
    const pokemonsFiltered = useSelector(state => state.pokemonsFiltered)
    const dispatch = useDispatch()
    

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handleAdvance = () => {
        if (currentPokemons.length === 12)setCurrentPage(currentPage + 1)
    }
    const handleBack = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
        
    }

    useEffect(() => {
      const getTypes = async () => {
          try {
              const response = await axios.get("http://localhost:3001/types");
              setTypes(response.data); // Actualizar el estado con los datos de los tipos
          } catch (error) {
              console.log('Error al obtener los tipos:', error);
          }
      };

      getTypes();
  }, []);

  
    

  const handleChangeType = (event) => {
    const typeName = event.target.value
    dispatch(filterPokemonsType(typeName))
  }

  const handleChangeOrigin = (event) => {
    const originName = event.target.value
    dispatch(filterPokemonsOrigin(originName))
  }

  const handleChangeOrder = (event) => {
    const orderName = event.target.value
    dispatch(orderPokemons(orderName))
  }
  const handleCleanFilters = () => {
    dispatch(cleanFilters())
  }
      return (
    <div className={style.cards}>

        {pokemon.length > 0 && <h3 className={style.results}>Resultados de tu busqueda:</h3>}
        <div className={style.searchCard}>
          
          {pokemon.map(({ id, name, image, types }) => (
            <Card
            
              key={id}
              id={id}
              name={name}
              image={image}
              types={types}
            />
          ))}</div>
          {!pokemons.length
          ? <div className={style.loader}> 
              <h4>Un momento por favor...</h4>
              <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Cargando..." />
            </div>
          :
          (
            <><div className={style.filters}>
            <select value={types.name} name="types" onChange={handleChangeType}>
                {types.map((type) => (
                <option key={type.id} value={type.name}>
                {type.name}
                </option>
                ))}
            </select>
            <select onChange={handleChangeOrigin}>
                <option  value="API">API</option>
                <option  value="BDD">BDD</option>
            </select>
            <select onChange={handleChangeOrder}>
                <option  value="A">A - Z</option>
                <option  value="Z">Z - A</option>
                <option  value="moreAttack">Mas ataque</option>
                <option  value="lessAttack">Menos ataque</option>
            </select>
            <button onClick={handleCleanFilters}>Limpiar Filtros</button>
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