import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall'
const apiKey = process.env.REACT_APP_WEATHER_API_KEY

const getCapitalWeather = ( capitalLat, capitalLong ) => {
  const request = axios.get(`${baseUrl}?lat=${capitalLat}&lon=${capitalLong}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`)
  // const request = axios.get('http://localhost:3001/data')
  return request
    .then(response => response.data)
    .catch(response => null)
}

export default { getCapitalWeather }