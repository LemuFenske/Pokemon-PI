import { useDispatch } from "react-redux"
import {cleanFilters, filterPokemonsOrigin, filterPokemonsType, orderPokemons} from '../../redux/actions'
import { useState, useEffect } from "react"
import axios from "axios"
import style from './Filters.module.css'


const Filters = () => {
    const dispatch = useDispatch()
    const [types, setTypes] = useState([])

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
        <div className={style.filters}>
            <select value={types.name} name="types" onChange={handleChangeType} className={style.selects}>
                {types.map((type) => (
                <option key={type.id} value={type.name}>
                {type.name}
                </option>
                ))}
            </select>
            <select onChange={handleChangeOrigin} className={style.selects}>
                <option  value="API">API</option>
                <option  value="BDD">BDD</option>
            </select>
            <select onChange={handleChangeOrder} className={style.selects}>
                <option  value="A">A - Z</option>
                <option  value="Z">Z - A</option>
                <option  value="moreAttack">Mas ataque</option>
                <option  value="lessAttack">Menos ataque</option>
            </select>
            <button onClick={handleCleanFilters} className={style.selects}>Limpiar Filtros</button>
        </div>
    )
}

export default Filters;