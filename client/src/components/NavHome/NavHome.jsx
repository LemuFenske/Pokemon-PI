import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from './NavHome.module.css'


const NavHome = ({onSearch})  => {
    return (
        <div className={style.NavHomeStyle}>
            <SearchBar onSearch={onSearch} />
            <Link to='/form'><button className={style.create}>Crear Pokemon</button></Link>
        </div>
    )
}

export default NavHome;