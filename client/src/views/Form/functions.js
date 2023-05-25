import axios from "axios"
import { validate } from "./validate";

export const handleSubmit = (event, form, setForm) => {
    event.preventDefault()
    axios.post('http://localhost:3001/pokemons', form)
    setForm({
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

}

export const handleChange = (event, form, setForm, setErrors, errors) => {
    const nameProp = event.target.name
    const valueProp = event.target.value
    setForm({...form, [nameProp]: valueProp})
    validate({...form, [nameProp]: valueProp}, setErrors, errors)
}