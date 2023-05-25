import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavDetail from "../../components/NavDetail/NavDetail";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../redux/actions";
import style from './Detail.module.css'



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
            <div className={style.detail}>
                <div className={style.info}>
                <p className={style.text}>Nombre: {pokemon.name}</p>
                <p className={style.text}>Id: {pokemon.id}</p>
                <p className={style.text}>Vida: {pokemon.hp}</p>
                <p className={style.text}>Ataque: {pokemon.attack}</p>
                <p className={style.text}>Defensa: {pokemon.defense}</p>
                <p className={style.text}>Velocidad: {pokemon.speed}</p>
                <p className={style.text}>Altura: {pokemon.height}</p>
                <p className={style.text}>Peso: {pokemon.weight}</p>
                <p className={style.text}>Tipos: {pokemon.types}</p>
                </div>
                <div className={style.imageContainer}>
                <img src={pokemon.image} alt={pokemon.name} className={style.image}/>
                </div>
            </div>
        </div>
    )
}

export default Detail;