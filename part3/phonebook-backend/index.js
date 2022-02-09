require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const res = require('express/lib/response')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require( './modules/persons')
app.use(express.json())
app.use(cors())
morgan.token('people', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :people'))

let persons = []

const total = () => {
  let count = 0
  persons.forEach(() => count += 1)
  return(count)
}

let date = new Date

app.get('/api/persons', (request, response) => {
  console.log(`people before get: ${persons}`)
  Person.find({})
  .then(peep => {
    response.json(peep)
    peep.forEach(p => persons.concat(p))
    console.log(`people after get: ${persons}`)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
   if(!person){
    return(response.status(400).json({error: 'content missing'}))
  }else if(!person.name && person.number){
    return(response.status(400).json({error: 'name missing'}))
  }else if(!person.number && person.name){
    return(response.status(400).json({error: 'number missing'}))
  }else if(!person.name && !person.number){
    return(response.status(400).json({error: 'content missing'}))
  }else{
  //  person.id = Math.floor(Math.random()*100000)
    persons = persons.concat(person)
    console.log(persons)
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log(`Removing entry with id: ${id}`)
  persons = persons.filter(person => person.id !== id)
  Person.findByIdAndRemove(id).then(response.status(204).end())
  
  
})

app.get('/api/persons/:id', (request, response) => {
  const wanted = Person.findById(request.params.id).then(person => {
    response.json(person)
  })
  if(wanted){
    response.json(wanted)
    response.status(200).end()
  }else{
    response.status(404).end()
  }
})

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const update = request.params.number.toString()
  
  if(Person.findById(id)){
    Person.findByIdAndUpdate(id, update) 
    response.status(200).end()
  }else{
    console.log("NOT FOUND")
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  response.send(`<p> Phonebook has info for ${total()} people </p> <p>${date}</p>`)
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
