require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const morgan = require('morgan')

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify({ body: req.body, params: req.params }),
    ].join(' ')
  })
)

app.get('/api/persons', (req, res) => {
  Person.find({}).then((r) => {
    res.json(r)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Person.findById(id)
    .then((r) => {
      if (r) {
        res.json(r)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(404).end()
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name and number are required',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((r) => {
    res.json(r)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const i = persons.findIndex((row) => {
    return row.id === id
  })
  if (~i) {
    persons.splice(i, 1)
  } else {
    return res.status(404).send('<p>not found</p>')
  }
  res.json(persons)
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name and number are required',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: body.id,
  }

  persons = persons.map((row) => (row.id === person.id ? person : row))

  res.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
