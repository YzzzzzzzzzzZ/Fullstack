const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password =  process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://root:${password}@cluster0.ftvuc.mongodb.net/phone-note?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name) {
  if (number) {
    const note = new Person({
      name,
      number,
    })

    note.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
  } else {
    console.log('请填写号码。')
  }
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name}: ${person.number}`)
    })
    mongoose.connection.close()
  })
}
