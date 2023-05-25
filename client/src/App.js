import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import {Landing, Home, Form, Detail} from './views/index'
import NavHome from './components/NavHome/NavHome';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const location = useLocation()
  const [pokemon, setPokemon] = useState([])


  const onSearch = async (name) => {
    try {
       const {data} = await axios(`http://localhost:3001/pokemons/name?name=${name}`)
       if (data.name) {
        setPokemon((oldPokemons) => [...oldPokemons, data])
       } 
       
    } catch (error) {
       alert('No hay personajes con este nombre');
    }   
 }

  
  return (
    <div className="App">
      {location.pathname === '/home' && <NavHome onSearch={onSearch} />}
      <Routes>
        <Route path = '/' element = {<Landing/>}/>
        <Route path = '/home' element = {<Home pokemon={pokemon} setPokemon={setPokemon}/>} />
        <Route path = '/form' element = {<Form/>}/>
        <Route path = '/detail/:id' element = {<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
