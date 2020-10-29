const express = require('express')
const app = express()

app.use(express.json())

const persons = [
  {
    id: 1,
    name: 'Yang',
    number: '13800138000',
  },
  {
    id: 2,
    name: 'Ze',
    number: '13800138000',
  },
  {
    id: 3,
    name: 'He',
    number: '13800138000',
  },
  {
    id: 4,
    name: 'Wiil',
    number: '13800138000',
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`
    <p>当前电话簿共 ${persons.length} 条</p>
    <p>${new Date().toDateString()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((row) => {
    return row.id === id
  })
  if (!person) {
    return res.status(404).send('<p>not found</p>')
  }
  res.json(person)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
