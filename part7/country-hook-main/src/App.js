import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }
  console.log(value)
  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState('')
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(response => setCountry(response.data[0]))
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }
console.log(country)
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div> 
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const [name, setName] = useState('')
  const nameInput = useField('text')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit' >find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
