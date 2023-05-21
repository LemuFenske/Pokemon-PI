import axios from "axios";
import { useState, useEffect } from "react";
import NavForm from "../../components/NavForm/NavForm";


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
        speed: '',
        height: '',
        weight: '',
        types: ''
    })
    const [types, setTypes] = useState([]);

    const validate = (form) => {
        if (!form.name.length) setErrors({...errors, name:'Nombre obligatrio'})
        else if (!/^[a-zA-Z]{1,20}$/.test(form.name)) setErrors({...errors, name:'Nombre no valido'});
        else setErrors({...errors, name:''})
    }

    const handleChange = (event) => {
        const nameProp = event.target.name
        const valueProp = event.target.value
        setForm({...form, [nameProp]: valueProp})
        validate({...form, [nameProp]: valueProp})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/pokemons', form)
    }

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
            <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre: </label>
                <input type="text" value={form.name} onChange={handleChange} name='name'/>
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Imagen: </label>
                <input type="text" value={form.image} onChange={handleChange} name='image'/>
            </div>
            <div>
                <label>Vida: </label>
                <input type="text" value={form.hp} onChange={handleChange} name='hp'/>
            </div>
            <div>
                <label>Ataque: </label>
                <input type="text" value={form.attack} onChange={handleChange} name='attack'/>
            </div>
            <div>
                <label>Defensa: </label>
                <input type="text" value={form.defense} onChange={handleChange} name='defense'/>
            </div>
            <div>
                <label>Velocidad: </label>
                <input type="text" value={form.speed} onChange={handleChange} name='speed'/>
            </div>
            <div>
                <label>Altura: </label>
                <input type="text" value={form.height} onChange={handleChange} name='height'/>
            </div>
            <div>
                <label>Peso: </label>
                <input type="text" value={form.weight} onChange={handleChange} name='weight'/>
            </div>
            <div>
                <label>Tipos: </label>
                <select multiple value={form.types} onChange={handleChange} name="types">
                {types.map((type) => (
                <option key={type.id} value={type.id}>
                {type.name}
                </option>
                ))}
                </select>
            </div>
            <button type="submit">Crear Pokemon</button>
            </form>
        </div>
    )
}

export default Form;