import Card from "../Card/Card"
import style from './Cards.module.css'
import {useSelector} from 'react-redux'

const  Cards = ({pokemon, pokemons}) => {
    console.log(pokemon);
    
    // const pokemons = useSelector(state => state.pokemons)
    
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
          {pokemons.map(({ id, name, image, types }) => (
            <Card
              key={id}
              id={id}
              name={name}
              image={image}
              types={types}
            />
          ))}

    </div>
  );
   
}

export default Cards;