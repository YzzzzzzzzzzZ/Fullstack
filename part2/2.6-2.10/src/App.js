import React, { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Fillter from './components/Fillter'

import { getPerson, createPerson, removePerson, updatePerson } from './api/index'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchPerson, setSearch] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    getPerson()
      .then((data) => {
        setPersons(data)
        setSearch(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleClick = (e) => {
    e.preventDefault()

    if (!newName || !newNumber) {
      alert('姓名或号码不能为空。')
      return
    }

    let person = { name: newName, number: newNumber }

    const row = persons.find((row) => {
      return row.name === newName
    })

    if (row) {
      if (window.confirm(newName + ' 已存在。继续上传会更改number。')) {
        person = { ...row, ...person }
        updatePerson(person)
          .then((r) => {
            setSearch(persons.map((item) => (item.id === row.id ? r : item)))
            setPersons(persons.map((item) => (item.id === row.id ? r : item)))
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } else {
      createPerson(person)
        .then((r) => {
          setSearch(persons.concat(r))
          setPersons(persons.concat(r))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleSearch = (val) => {
    let searchList = []
    persons.forEach((row) => {
      const reg = new RegExp(val, 'i')
      if (row.name.match(reg)) {
        searchList = searchList.concat(row)
      }
    })
    setSearch(searchList)
  }

  const handleRemove = (id) => {
    if (window.confirm('确认删除吗？')) {
      removePerson(id)
        .then((r) => {
          const i = persons.findIndex((row) => {
            return row.id === id
          })
          setPersons(persons.slice(0, i).concat(persons.slice(i + 1)))
          setSearch(persons.slice(0, i).concat(persons.slice(i + 1)))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Fillter onSearch={(val) => handleSearch(val)} />
      <h3>add a new</h3>
      <PersonForm setName={(val) => setNewName(val)} setNumber={(val) => setNewNumber(val)} onSubmit={(e) => handleClick(e)} />
      <h3>Numbers</h3>
      <Persons list={searchPerson} onRemove={(id) => handleRemove(id)} />
    </div>
  )
}

export default App
