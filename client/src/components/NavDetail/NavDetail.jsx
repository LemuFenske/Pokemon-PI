import { Link } from "react-router-dom";
import style from './NavDetail.module.css'

const NavDetail = ()  => {
    return (
        <div className={style.NavDetailStyle}>
            <Link to='/home'><button className={style.home}>Home</button></Link>
        </div>
    )
}

export default NavDetail;