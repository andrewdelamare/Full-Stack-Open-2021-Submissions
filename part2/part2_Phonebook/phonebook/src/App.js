import React, { useState } from 'react'

const Part = (props) => {
  console.log(props)
  return (
    <p key={props.key}>
      {props.name}
    </p>    
  )
}

const Content = ({ persons }) => {
  console.log(persons)
  return (
    <div>
      {persons.map((person) => <Part key={person.id} name={person.name} />)}
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
    { name: 'Arto Hellas',
      id: 0 }
  ]) 
  const [newName, setNewName] = useState('')
  

  const addNewPerson = (event) => {
    event.preventDefault()
    const oldPersons = persons
    const id = oldPersons.length 
    const newPerson = {name: newName, id: id}
    const newPersons = oldPersons.concat(newPerson)
    setPersons(newPersons)
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    console.log(persons)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleNewName} />
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