import { useState } from "react";
import style from './SearchBar.module.css'


const SearchBar = ({onSearch}) => {
    const [name, setName] = useState('')

    const handleChange = (event) => {
        setName(event.target.value)
    }
    const handleSearch = () => {
        onSearch(name)
        setName('')
    }

    return (
        <div className={style.searchbar}>
            <input type="search" value={name} onChange={handleChange} className={style.input}/>
            <button onClick={handleSearch} className={style.button}>Buscar</button>
        </div>
    )
}

export default SearchBar;