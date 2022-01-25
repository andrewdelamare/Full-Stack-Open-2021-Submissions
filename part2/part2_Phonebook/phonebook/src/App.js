import React, { useState } from 'react'
import { Numbers } from './numbers'
import { Filter } from './filter'
import { NumberEntry } from './numberEntry'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '650 123 4567', id: 0 }, 
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ]) 
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
    setPersons(newPersons)}
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