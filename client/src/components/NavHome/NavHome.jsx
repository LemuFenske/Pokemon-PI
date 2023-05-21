import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from './NavHome.module.css'


const NavHome = ({onSearch})  => {
    return (
        <div className={style.NavHomeStyle}>
            <SearchBar onSearch={onSearch} />
            <Link to='/form'><button className={style.create}>Crear Pokemon</button></Link>
            <select>
                <option  value="">Normal</option>
                <option  value="">Fire</option>
            </select>
            <select>
                <option  value="">API</option>
                <option  value="">BDD</option>
            </select>
            <select>
                <option  value="">A - Z</option>
                <option  value="">Z - A</option>
                <option  value="">+Att -Att</option>
                <option  value="">-Att +Att</option>
            </select>
        </div>
    )
}

// Botones/Opciones para filtrar por tipo, y por si su origen es de la API o de la base de datos 
// (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemones por 
// orden alfabético y por ataque.
export default NavHome;