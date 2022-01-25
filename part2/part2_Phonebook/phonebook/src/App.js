import React, { useState } from 'react'

const Part = (props) => {
  console.log(props)
  return (
    <p key={props.id}>
      {props.name} {props.number}
    </p>    
  )
}

const Content = ({ persons }) => {
  console.log(persons)
  return (
    <div>
      {persons.map((person) => <Part key={person.id} name={person.name} number={person.number} />)}
    </div>
  )
}

const Numbers = ({ persons }) => {
  return(
    <div>
      <h2>Numbers</h2>
      <Content persons={persons} />
   </div> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '650 123 4567',
      id: 0 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  

  const addNewPerson = (event) => {
    event.preventDefault()
    const oldPersons = persons
    const id = oldPersons.length 
    const names = oldPersons.map((person) => person.name)
    const included = names.includes(newName) ? true : false
    if(included){
      return(window.alert(`${newName} is already indluded in your phonebook`))
    }else{
    const newPerson = {name: newName, number: newNumber, id: id}
    const newPersons = oldPersons.concat(newPerson)
    setPersons(newPersons)}
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    console.log(persons)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    console.log(persons)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          Name: <input onChange={handleNewName} />
        </div>
        <div>
          Number: <input onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )
}

export default App