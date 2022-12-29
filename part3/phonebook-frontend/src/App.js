import { useState, useEffect } from 'react'

import phonebookAPI from './services/phonebook'

import TextInput from './components/TextInput'
import AddPersonForm from './components/AddPersonForm'
import Header from './components/Header'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({message: null, type: "error"})

  useEffect(() => {
    phonebookAPI
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const isInList = (element) => element.name === newName;

  const addEntry = (event) => {
    event.preventDefault()
    if (persons.some(isInList)) {
      if (window.confirm(`${newName} is already in list. Do you want to update the number to ${newNumber}?`)) {
        const personToUpdate = persons.find(n => n.name === newName)
        const updatedPerson = {...personToUpdate, number: newNumber}
        phonebookAPI
          .update(personToUpdate.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(n => n.id !== personToUpdate.id ? n : response))
            setNotification({message: `${personToUpdate.name} was updated`, type: "success"})
            setTimeout(() => {
              setNotification({message: null, type: "success"})
            }, 3000)
          })
          .catch(error => {
            setNotification({message: `The contact you are trying to change has been deleted`, type: "error"})
            setTimeout(() => {
              setNotification({message: null, type: "success"})
            }, 3000)
          })
      }
    } else {
      const entryObject = {
        name: newName,
        number: newNumber
      }
      phonebookAPI
        .create(entryObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({message: `${returnedPerson.name} was added`, type: "success"})
            setTimeout(() => {
              setNotification({message: null, type: "success"})
            }, 3000)
        })
    }
  }

  const deleteEntry = (id) => {
    const personToDelete = persons.find(n => n.id === id)
    const personlist = persons.map(n => n)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookAPI
        .remove(id)
        .then(response => {
          const index = persons.indexOf(personToDelete)
          const deleted = personlist.splice(index, 1)
          setPersons(personlist)
          setNotification({message: `${personToDelete.name} was deleted`, type: "success"})
            setTimeout(() => {
              setNotification({message: null, type: "success"})
            }, 3000)
        })
    }
  }

  const filteredEntries = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) === true)

  return (
    <div>
      <Header level="1" text="Phonebook" />
      <Notification message={notification.message} type={notification.type} />
      <Header level="2" text="Add a new entry" />
      <AddPersonForm onSubmit={addEntry} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} nameValue={newName} numberValue={newNumber} />
      <Header level="2" text="Numbers" />
      <TextInput name="Filter by name" handler={handleFilterChange} value={filter} />
      <Persons persons={filteredEntries} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App
