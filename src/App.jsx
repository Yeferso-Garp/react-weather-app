
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard';

import HandleWeatherCard from './components/HandleWeatherCard';

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [cardWeather, setCardWeather] = useState(true);


  useEffect(() => {

    const success = pos => {
      // console.log(pos);
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
  
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords) {
      const apiKey = 'cd063f12774ae5795c90be23358d4835'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`

      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp -273.15) * 9/5 +32).toFixed(1)  
          }
          setTemp(obj)
        })
        .catch(err => console.log(err));
    }

  }, [coords])
  console.log(coords)
  

  

  const handleCardWeather = () => {
    setCardWeather(!cardWeather)
  };


  return (
    <div>
      <button onClick={handleCardWeather} className='change__card'> { cardWeather ? ' ⬅️ Search Weather City' : ' ⬅️ Weather Location' } </button>
      {/* <h1>Weather App</h1> */}

      {
        cardWeather
        ? <WeatherCard 
        weather = {weather}
        temp = {temp}
        />
        :<HandleWeatherCard />

      }

      
      

    </div>
  )
}

export default App
