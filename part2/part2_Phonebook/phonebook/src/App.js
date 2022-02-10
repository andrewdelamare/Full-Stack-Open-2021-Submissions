import React, { useState, useEffect } from 'react'
import { Numbers } from './numbers'
import { Filter } from './filter'
import { NumberEntry } from './numberEntry'
import { Notification } from './notification'
import nService from './services/namesService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState({text: '', isOn: false})
  const [notification, setNotification] = useState({msg: null, type: null})

  useEffect(()=>{nService.getAll().then(initialResponse => setPersons(initialResponse))}, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    const oldPersons = persons
    // ID generation now unecessary
    // const newid = oldPersons[oldPersons.length-1].id + 1  
    const names = oldPersons.map((person) => person.name)
    const included = names.includes(newName) ? true : false
    if(included){
      const oldPerson = oldPersons.filter(person => person.name === newName)
      const oldPersonDat = oldPerson[0]
      const newishPerson = {name: newName, number: newNumber, id: oldPersonDat.id}
      const confirmed = window.confirm(`${newName} is already included in your phonebook. Update ${newName}?`)
      if(confirmed){ 
        nService
          .update(newishPerson)
          .catch(() => setNotification({msg: `${newishPerson.name} was already removed from the server`, type: false}))
        //struggled for many hours to get setPersons to update the state correctly, with previous strategies the state would update but wouldnt re render
        setPersons(persons.map(person => {
          if(person.name !== newishPerson.name){
            return person
          }else{return newishPerson}}))
        setNotification({msg:`Sucessfully updated ${newishPerson.name}!`, type:true})
        setTimeout(() => {
          setNotification({msg: null, type: null})
          }, 5000)
      }else{
        console.log('unconfirmed')
      }
    }else{
      const newPerson = {name: newName, number: newNumber}
      nService.create(newPerson)
      .then(response => setPersons(persons.concat(response)))
      .then(() => {
        setNotification({msg:`Sucessfully added ${newPerson.name}!`, type:true})
        setTimeout(() => {
          setNotification({msg: null, type: null})
        }, 5000)
      })
      .catch(error => {
        if(error.response){
        setNotification({msg:`${error.response.data}`, type:false})
        console.log(`error: ${error.response.data}`)
        setTimeout(() => {
          setNotification({msg: null, type: null})
        }, 5000)}
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
  const handleDeleteEvent = (id, name) => {
    console.log('updating state with handleDeleteEvent')
    setPersons(persons.filter(person => person.id !== id))
    setNotification({msg: `Successfully deleted ${name}`, type:true})
    setTimeout(() => {
      setNotification({msg: null, type: null})
      }, 5000)
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.msg} type={notification.type} />
      <Filter handleNewFilter={handleNewFilter} />
      <NumberEntry addNewPerson={addNewPerson} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <Numbers persons={persons} filter={filter} handleDeleteEvent={handleDeleteEvent}/>
    </div>
  )
}

export default App