const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (req, res, next) => {
  Person.find({})
    .then((r) => {
      res.json(r)
    })
    .catch((err) => next(err))
})

personRouter.get('/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then((r) => {
      if (r) {
        res.json(r)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

personRouter.post('/', (req, res, next) => {
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

  person
    .save()
    .then((r) => {
      res.json(r)
    })
    .catch((err) => next(err))
})

personRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((r) => {
      if (r) {
        res.json(r)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

personRouter.put('/:id', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name and number are required',
    })
  }

  Person.findByIdAndUpdate(req.params.id, body, { runValidators: true, context: 'query', new: true })
    .then((r) => {
      if (r) {
        res.json(r)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

module.exports = personRouter
