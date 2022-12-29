import OneCountry from './OneCountry'
import NoCountries from './NoCountries'
import TooManyCountries from './TooManyCountries'
import ListOfCountries from './ListOfCountries'

const SearchResult = ({ countries, filter, setNewFilter }) => {
    const numberOfCountries = countries.length;
    
    if (numberOfCountries > 10) {
        return (<TooManyCountries numberOfCountries={numberOfCountries} filter={filter} />)
    } else if (numberOfCountries > 1) {
        return (<ListOfCountries countries={countries} setNewFilter={setNewFilter} />)
    } else if (numberOfCountries === 1) {
        const country = countries[0]
        return (<OneCountry country={country} />)
    } else {
        return (<NoCountries />)
    }
    
}

export default SearchResult