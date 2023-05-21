import { useState } from "react";


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
        <div>
            <input type="search" value={name} onChange={handleChange}/>
            <button onClick={handleSearch}>Buscar</button>
        </div>
    )
}

export default SearchBar;