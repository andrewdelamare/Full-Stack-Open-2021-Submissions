import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Numbers } from './numbers'
import { Filter } from './filter'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setNewFilter] = useState({text: '', isOn: false})
  

  const handleNewFilter = (event) => {
    const value = event.target.value
    value.toLowerCase()
    let on = value !== '' ? true : false
    setNewFilter({text: `${value}`, isOn:on })
  }

  const getData = () => {
    axios 
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(getData, [])

  return (
    <div>
      <h2>Search for a Country</h2>
      <Filter handleNewFilter={handleNewFilter} />
      <Numbers countries={countries} filter={filter}/>
    </div>
  )
}

export default App