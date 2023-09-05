import { useEffect, useState } from "react";
import axios from "axios";
import Images from './Images';

const WeatherCard = ( { weather, temp } ) => {


    // console.log(weather)
    const [isCelsius, setIsCelsius] = useState(true);
    const [images, setImages] = useState();

  const handleChangeTemp = () => {
      setIsCelsius(!isCelsius);
  };
  

  useEffect(() => {
    if (weather) {
      const url = `https://pixabay.com/api/?key=${ '39164430-618d2cd7236936eae85f57b27' }&q=${ weather?.weather[0].main }`
      console.log(weather?.weather[0].main)

      axios.get(url)
        .then(res => setImages(res.data))
        .catch(err => console.log(err));
    }

  }, [weather])



  return (
    <article className="container">
      <div>
        <h1 className="container__title">  Weather App Location</h1>
        <h2 className="card__title"> { weather?.name }, { weather?.sys.country } </h2>
        <div className="data__weather">
          <div className="icono">
            <img 
            src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="" />
          </div>
          <section className="section__card">
            <h3>{weather?.weather[0].description}</h3>
            <ul>
              <li> <span>Wind Speed </span> <span>{ weather?.wind.speed } m/s</span> </li>
              <li> <span>Clouds </span> <span>{ weather?.clouds.all } %</span> </li>
              <li> <span>Pressure </span> <span>{ weather?.main.pressure } hPa</span> </li>
            </ul>
          </section>
        </div>
        <h2 className="temp__title"> { isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F` }  </h2>
        <button className="btn__button" onClick={ handleChangeTemp }>{isCelsius ? 'Change to °F' : 'Change to °C' } </button>
      </div>
      <div className="images__pixabay">
        <Images 
        images = {images}
        />
      </div>
      

    </article>
  )
}

export default WeatherCard
