import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import ImageCity from './ImageCity';

const HandleWeatherCard = () => {

    const [weatherCity , setWeatherCity ] = useState();
    const [inputValue, setInputValue] = useState('madrid');
    const [isCelsius, setIsCelsius] = useState(true);
    const [temperature, setTemperature] = useState();
    const [error, setError] = useState(null);
    const [image, setImage] = useState();


//useEffect para llamar una api por el nombre de la ciudad
    useEffect(() => {
        const appid = 'cd063f12774ae5795c90be23358d4835'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${appid}`

        axios.get(url)
            .then(res => {
                setWeatherCity(res.data)
                const obj = {
                    celsius: (res.data.main.temp - 273.15).toFixed(1),
                    farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
                };
                setTemperature(obj);
                setError(null);
            })
            .catch(err => {
              setError("Por favor, ingrese una ciudad válida.");
              console.error(err);
            }) /* console.log(err)); */
    }, [ inputValue ]);

//useEffecct para llamar una imagen de pixabay
    useEffect(() => {
      if (weatherCity) {
        const url = `https://pixabay.com/api/?key=${ '39164430-618d2cd7236936eae85f57b27' }&q=${ weatherCity?.weather[0].main }`
        // console.log(weatherCity?.weather[0].main)
  
        axios.get(url)
          .then(res => setImage(res.data))
          .catch(err => console.log(err));
      }
  
    }, [weatherCity])


    const inputSearch = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(inputSearch.current.value);
        setInputValue(inputSearch.current.value);
    };


    
  const handleChangeTemp = () => setIsCelsius(!isCelsius);





  return (
    <div>
      <form className='handle__run' onSubmit={handleSubmit}>
        <input ref={inputSearch} type="text" placeholder='enter a city...' className='input__search' />
        <button className='btn__Search'>🔍Search</button>
      </form>

      {
        error
        ? <div className='conatiner__error'>
            <p>{error}</p>
          </div>

        :  inputValue
          ? <article className='container'>
              <h1 className='container__title'>Weather App For City</h1>
              <h2 className='card__title'> { weatherCity?.name }, { weatherCity?.sys.country } </h2>
              <div className='data__weather'>
                <div className="icono">
                  <img 
                  src={weatherCity && `https://openweathermap.org/img/wn/${weatherCity.weather[0].icon}@2x.png`} 
                  alt="" />
                </div>
                <section className="section__card">
                  <h3>{weatherCity?.weather[0].description}</h3>
                  <ul>
                    <li> <span>Wind Speed </span> <span>{ weatherCity?.wind.speed } m/s</span> </li>
                    <li> <span>Clouds </span> <span>{ weatherCity?.clouds.all } %</span> </li>
                    <li> <span>Pressure </span> <span>{ weatherCity?.main.pressure } hPa</span> </li>
                  </ul>
                </section>
              </div>
              <h2 className='temp__title'> { isCelsius ? `${temperature?.celsius} °C` : `${temperature?.farenheit} °F` }  </h2>
              <button className='btn__button' onClick={ handleChangeTemp }>{isCelsius ? 'Change to °F' : 'Change to °C' } </button>
    
              <ImageCity 
              image = { image }
              />

            </article>
        : <div>...</div> 
        
        
      }
 

    </div>
  )
}

export default HandleWeatherCard
