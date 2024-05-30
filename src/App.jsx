import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './App.css'
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  
  async function handleSearch(){

   if(input === ''){
    alert("Preencha com algum cep!")
    return;
   } 

   try{
    const response = await api.get(`${input}/json`);
    setCep(response.data)
    setInput("");

   }catch{
    alert("Ops erro ao buscar")
    setInput("")
   }
  }

  return(
    <div className='container'>
      <h2 className='title'>Buscar cep</h2>

      <div className='containerInput'>
        <input 
        type='text'
        placeholder='Digite um cep...'
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className='btnSeach'><FiSearch size={25} color='#fff'
        onClick={handleSearch}
        /></button>
      </div>

      {Object.keys(cep).length > 0 && (
          <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.compemento}</span>
          <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

      
    </div>
  )
}

export default App