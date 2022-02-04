const { request, response } = require('express')
const express = require('express')
const res = require('express/lib/response')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('people', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :people'))

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

const total = () => {
  let count = 0
  persons.forEach(() => count += 1)
  return(count)
}

let date = new Date

app.post('/api/persons', (request, response) => {
  const person = request.body
  const personExists = (person) => {
    let exists = []
    exists = persons.map(per => {if(per.name === person.name){return true}})

    if(exists.includes(true)){
      return(true)
    }else{
      return(false)
    }
  }
   if(!person){
    return(response.status(400).json({error: 'content missing'}))
  }else if(!person.name && person.number){
    return(response.status(400).json({error: 'name missing'}))
  }else if(!person.number && person.name){
    return(response.status(400).json({error: 'number missing'}))
  }else if(!person.name && !person.number){
    return(response.status(400).json({error: 'content missing'}))
  }else if(personExists(person)){
    return(response.status(400).json({error: 'person already exists'}))
  }else{
    person.id = Math.floor(Math.random()*100000)
    persons = persons.concat(person)
    return(response.json(person))
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id.toString() !== id)
  response.status(204).end()
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const wanted = persons.find(person => person.id.toString() === id)
  if(wanted){
    response.json(wanted)
  }else{
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  response.send(`<p> Phonebook has info for ${total()} people </p> <p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

