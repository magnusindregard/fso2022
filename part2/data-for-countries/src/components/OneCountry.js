import useEffect from 'react'
import Header from "./Header"
import LanguageList from "./LanugageList"
import WeatherData from "./WeatherData"


const OneCountry = ({ country, weather, setLocation }) => {
    
    const languageKeys = Object.keys(country.languages)

    const capitalLat = country.capitalInfo.latlng[0]
    const capitalLong = country.capitalInfo.latlng[1]

    return (
        <div>
            <Header text={country.name.common} level="2" />
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <Header level="3" text="Languages" />
            <LanguageList country={country} languageKeys={languageKeys} />
            <img src={country.flags.png} />
            <WeatherData capitalName={country.capital} weather={weather} capitalLat={capitalLat} capitalLong={capitalLong} />
            
        </div>
    )
}

export default OneCountry