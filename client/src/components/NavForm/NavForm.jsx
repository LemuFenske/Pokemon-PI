import { Link } from "react-router-dom";
import style from './NavForm.module.css'

const NavForm = ()  => {
    return (
        <div className={style.NavFormStyle}>
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}

export default NavForm;