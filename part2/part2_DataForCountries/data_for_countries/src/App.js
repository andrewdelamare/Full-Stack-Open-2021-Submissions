import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Numbers } from './numbers'
import { Filter } from './filter'


const App = () => {
  const [countries, setCountries] = useState([]) 
//  const [newName, setNewName] = useState('')
//  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState({text: '', isOn: false})

//  const addNewPerson = (event) => {
//    event.preventDefault()
//    const oldPersons = persons
//    const id = oldPersons.length 
//    const names = oldPersons.map((person) => person.name)
//    const included = names.includes(newName) ? true : false
//    if(included){
//      return(window.alert(`${newName} is already included in your phonebook`))
//    }else{
//    const newPerson = {name: newName, number: newNumber, id: id}
//    const newPersons = oldPersons.concat(newPerson)
//    setPersons(newPersons)}
//  }

//  const handleNewName = (event) => {
//    setNewName(event.target.value)
//  }

//  const handleNewNumber = (event) => {
//    setNewNumber(event.target.value)
//  }

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
      <Numbers persons={countries} filter={filter} />
    </div>
  )
}

export default App