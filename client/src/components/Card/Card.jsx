import style from './Card.module.css'
import {NavLink, Link } from "react-router-dom";

const Card = ({id, name, image, types}) => {
   
    
    return (
        <div className={style.card}>
            
            <h2 ><NavLink className={style.cardName} to={`/detail/${id}`}>{name}</NavLink></h2>
            
            <img className={style.cardImage} src={image} alt={name} />
            <h4 className={style.cardTypes}>{types}</h4>

        </div>
    )
}

export default Card;
