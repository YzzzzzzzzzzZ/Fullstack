const express = require('express')
const app = express()

app.use(express.json())

const persons = [
  {
    id: 1,
    name: 'Yang',
    number: '13800138000',
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
