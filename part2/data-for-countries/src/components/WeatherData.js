import { useEffect, useState} from 'react'
import Header from './Header'
import WeatherAPI from '../services/weather'

const WeatherData = ({ capitalName, capitalLong, capitalLat }) => {

        const [weather, setWeather] = useState(null)
    
        const headerText = `Weather in ${capitalName}`
     
        useEffect(() => {
            WeatherAPI
                .getCapitalWeather(capitalLat, capitalLong)
                .then(weather => {
                        setWeather(weather)
                })

        }, [])

        

        if (weather) {
            const weatherImgUrl = `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
            const celsius = Math.round(weather.current.temp - 273.15)
            return(
                <div>
                    <Header level="2" text={headerText} />
                    <p>Temperature: {celsius} degrees celsius</p>
                    <p><img src={weatherImgUrl} /></p>
                    <p>Wind speed: {weather.current.wind_speed} m/s</p>
                </div>
            )
            } else {
                return (
                    <p>No weather</p>
                )
            }
            
    }
    
    



export default WeatherData