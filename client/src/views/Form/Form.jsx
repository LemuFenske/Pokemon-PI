import axios from "axios";
import { useState, useEffect } from "react";
import NavForm from "../../components/NavForm/NavForm";
import style from './Form.module.css'
import { handleSubmit, handleChange } from "./functions";


const Form = () => {
    const [form, setForm] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    })

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
    })
    const [types, setTypes] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid =
          !errors.name.length &&
          !errors.image.length &&
          !errors.hp.length &&
          !errors.attack.length &&
          !errors.defense.length;
      
        setIsFormValid(isValid);
      }, [errors]);


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

    return (
        <div>
            <NavForm/>
            <form onSubmit={(event) => handleSubmit(event, form, setForm)} >
            <div className={style.form}>
                <h2 className={style.formTitle}>Crear Pokemon:</h2>
                <p className={style.formTitle}>Los campos con un * son obligatorios</p>
            <div className={style.infoForm}>
                <label>Nombre: </label>
                <input type="text" value={form.name} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name='name'/>
                {errors.name && <span className={style.errors}>{errors.name}</span>}
            </div>
            <div className={style.infoForm}>
                <label>Imagen: </label>
                <input type="text" value={form.image} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name='image'/>
                {errors.image && <span className={style.errors}>{errors.image}</span>}
            </div>
            <div className={style.infoForm}>
                <label>Vida: </label>
                <input type="text" value={form.hp} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name='hp'/>
                {errors.hp && <span className={style.errors}>{errors.hp}</span>}
            </div>
            <div className={style.infoForm}>
                <label>Ataque: </label>
                <input type="text" value={form.attack} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name='attack'/>
                {errors.attack && <span className={style.errors}>{errors.attack}</span>}
            </div>
            <div className={style.infoForm}>
                <label>Defensa: </label>
                <input type="text" value={form.defense} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name='defense'/>
                {errors.defense && <span className={style.errors}>{errors.defense}</span>}
            </div>
            <div className={style.infoForm}>
                <label>Velocidad: </label>
                <input type="text" value={form.speed} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name='speed'/>
            </div>
            <div className={style.infoForm}>
                <label>Altura: </label>
                <input type="text" value={form.height} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name='height'/>
            </div>
            <div className={style.infoForm}>
                <label>Peso: </label>
                <input type="text" value={form.weight} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name='weight'/>
            </div>
            <div  className={style.selectForm}>
                <label>Tipos: </label>
                <select value={form.types} onChange={(event) => handleChange(event, form, setForm, setErrors, errors)} name="types" className={style.selectForms}>
                {types.map((type) => (
                <option key={type.id} value={type.id}>
                {type.name}
                </option>
                ))}
                </select>
            </div>
            <button type="submit" className={style.buttonCreate} disabled={!isFormValid}>Crear Pokemon</button>
            </div>
            </form>
        </div>
    )
}

export default Form;