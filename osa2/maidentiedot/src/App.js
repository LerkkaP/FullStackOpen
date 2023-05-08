import { useState, useEffect } from "react";
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])

  const [filter, setFilter] = useState('')

  const names = countries.map(country => country.common).filter(country => country.toLowerCase().indexOf(filter.toLowerCase()) >= 0)

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data.map(country => country.name))
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleChange}/>
      <Countries names={names} filter={filter}/>
      {/*countries.map((country => (<p>{country.common}</p>)))*/}
    </div>
  )
}

const Countries = ({filter, names}) => {
  if (filter !== '') {
    if (1 < names.length <= 10)
    return (
      <p>{names}</p>)
    else {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
  }
}

export default App
