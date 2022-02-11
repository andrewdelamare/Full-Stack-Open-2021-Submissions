const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    validate: {
      validator: function numberValidator (num) {
        return /\d{2}-\d{6,}|\d{3}-\d{5,}/.test(num)
      },
      message: props => `${props.value} is not a valid phone number. Must be 8digits or longer and in 00-000000 or 000-00000 format.`
    },
    type: String,
    required: [true, 'Phone number required!']
  }
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)