
const ListOfCountries = ({ countries, setNewFilter }) =>
<ul>
    {countries.map(
        country => <p key={country.cca3}><span>{country.name.common} . </span><button onClick={() => setNewFilter(country.name.common)}>Select</button></p>
    )}
</ul>

export default ListOfCountries