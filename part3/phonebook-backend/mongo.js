const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.f18po.mongodb.net/test?retryWrites=true`

mongoose.connect(url)

const personeSchema = new mongoose.Schema({
    name: String,
    number: Number
  })

const Person = new mongoose.model('Person', personeSchema)



if(process.argv.length < 4){
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
}else if(process.argv.length === 5){
    const personName = process.argv[3]
    const personNum = process.argv[4]

    const person = new Person({
        name: personName,
        number: personNum
    })
    person.save().then(result => {
        console.log(`added ${personName} ${personNum} to your phonebook`)
        mongoose.connection.close()
      })
}else{
    mongoose.connection.close()
    process.exit(1)
}