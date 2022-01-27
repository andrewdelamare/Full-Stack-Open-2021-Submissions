import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Numbers } from './numbers'
import { Filter } from './filter'
import { NumberEntry } from './numberEntry'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState({text: '', isOn: false})

  const addNewPerson = (event) => {
    event.preventDefault()
    const oldPersons = persons
    const id = oldPersons.length 
    const names = oldPersons.map((person) => person.name)
    const included = names.includes(newName) ? true : false
    if(included){
      return(window.alert(`${newName} is already included in your phonebook`))
    }else{
    const newPerson = {name: newName, number: newNumber, id: id}
    const newPersons = oldPersons.concat(newPerson)
    setPersons(newPersons)
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
      }) 
    }
  }
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    const value = event.target.value
    value.toLowerCase()
    let on = value !== '' ? true : false
    setNewFilter({text: `${value}`, isOn:on })
  }

  const getData = () => {
    axios 
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(getData, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNewFilter={handleNewFilter} />
      <NumberEntry addNewPerson={addNewPerson} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App