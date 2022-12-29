import { useState, useEffect } from 'react';
import axios from 'axios'

import TextInput from './components/TextInput';
import Header from './components/Header';
import SearchResult from './components/SearchResult';

const App = () => {
  
  const [filter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const countriesToRender = filter === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()) === true)

  return (
    <>
      <Header level="1" text="Data for countries" />
      <TextInput name="Search for country" handler={handleFilterChange} value={filter} />
      <SearchResult countries={countriesToRender} filter={filter} setNewFilter={setNewFilter} />
      
    </>
  );
}

export default App;
