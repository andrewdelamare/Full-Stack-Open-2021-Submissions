require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const res = require('express/lib/response')
const morgan = require('morgan')
const app = express()
app.use(express.json())
const cors = require('cors')
const Person = require( './modules/persons')
const req = require('express/lib/request')
app.use(cors())
morgan.token('people', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :people'))

let date = new Date
let count = undefined

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'TypeError'){
    return response.status(400).send({error: 'type error'})
  }else if (error.name === 'ValidationError'){
    return response.status(400).send(error.message)
  }
  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}



app.get('/api/persons', (request, response, next) => {
  Person.find({})
  .then(peep => response.json(peep))
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
 Person.find({name: person.name}, function(error, result) {
  console.log(`result: ${result}`)
  if (result.length >= 1){
      return response.status(400).send({error: 'person already exists'})
    }else{
      person.save()
      .then(savedPerson => {response.json(savedPerson)})
    }
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
  .then(response.status(204).end())
  .catch(error => next(error))
  console.log(`Removing entry with id: ${id}`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(
    person => {
      response.json(person)
      response.status(200).end()
    })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body
  console.log("person", person)
  
  Person.findByIdAndUpdate(person.id, person, {runValidators: true})
  .then(person => {
    response.json(person)
    response.status(200).end()
  })
  .catch(error => next(error))
  
})

app.get('/info', (request, response) => {
  Person.estimatedDocumentCount(function (err, count) {
    if (err){
        console.log(err)
    }else{
      return response.send(`<p> Phonebook has info for ${count} people </p> <p>${date}</p>`)    
    }})
})

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
