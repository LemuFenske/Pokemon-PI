import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavDetail from "../../components/NavDetail/NavDetail";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../redux/actions";



const Detail = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.pokemon)

    useEffect(() => {
        dispatch(getPokemon(id))
      }, []);
     

    return (
        <div>
            <NavDetail/>
            <div>
                <h2>Nombre: {pokemon.name}</h2>
                <h3>Id: {pokemon.id}</h3>
                <h3>Vida: {pokemon.hp}</h3>
                <h3>Ataque: {pokemon.attack}</h3>
                <h3>Defensa: {pokemon.defense}</h3>
                <h3>Velocidad: {pokemon.speed}</h3>
                <h3>Altura: {pokemon.height}</h3>
                <h3>Peso: {pokemon.weight}</h3>
                <h3>Tipos: {pokemon.types}</h3>
                <img src={pokemon.image} alt={pokemon.name} />
            </div>
        </div>
    )
}

export default Detail;