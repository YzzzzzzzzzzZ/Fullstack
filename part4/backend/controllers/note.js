const noteRouter = require('express').Router()
const Note = require('../moudels/note')

noteRouter.get('/', (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes)
    })
    .catch((err) => next(err))
})

noteRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
      response.status(200).json(savedNote)
    })
    .catch(error => next(error))
})

module.exports = noteRouter
