import { useState, useEffect } from 'react'
import personService from './services/notes'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [successMessage, setSuccessMessage] = useState(null)

  const deletePerson = (id) => {
    const person = persons.filter(p => p.id === id).map(filteredPerson => filteredPerson.name).slice(-1)[0]
    if (window.confirm(`Delete ${person}?`) === true) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccessMessage(`Deleted ${person}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500)
        })
        .catch(error => {
          setSuccessMessage('Person not found')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500)
        })
    }
  }

  const updatePerson = () => {
    const id = persons.filter(person => person.name === newName).map(filteredPerson => filteredPerson.id)
    const changedPerson = {name: newName, number: newNumber}
    personService
      .update(id, changedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
        setSuccessMessage(`Replaced ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2500)
      })
      .catch(error => {
        setSuccessMessage(`Information of ${newName} has already been removed from server`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2500)
      })
  } 

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true) {
        updatePerson()
      } 
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500)
        })
        .catch(error => {
          setSuccessMessage(error.response.data.error)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2500)
        })
    }   
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const filtteri = persons.filter(person =>person.name.toLowerCase().indexOf(newFilter.toLowerCase()) >= 0)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <Filter newFilter={newFilter} handleFilter={handleFilter}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
      <h3>Numbers</h3>
      <Persons filtteri={filtteri} deletePerson={deletePerson}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleName}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    props.filtteri.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => props.deletePerson(person.id)}>delete</button></p>)
  )
}

const Filter = (props) => {
  return (
    <div>
      Filter shown with <input value={props.newFilter} onChange={props.handleFilter}/>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } if (message.includes("Deleted") || message.includes("Replaced") || message.includes("Added")) {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  return (
    <div className="error">
      {message}
    </div>   
  )
}

export default App