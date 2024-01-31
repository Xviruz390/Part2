import { useEffect, useState } from 'react'
import axios from 'axios'
import weatherService from './services/weather.jsx';
import './App.css';


function App() {

  const [ countries, setCountries ] = useState([]);
  const [ countriesSeeker, setCountriesSeeker ] = useState([])
  const [ countriesFiltered, setCountriesFiltered ] = useState([]); 
  const [ weather, setWeather ] = useState(null); console.log(weather)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => {
        setCountries(response.data)
      })
  },[])

  const showWeather = (capital) => {
      weatherService.getWeather(capital).then((weather) => setWeather(weather));
  };

  const handleCountriesChange = (event) => {
    const filtered = countries.filter((countries) => 
      countries.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    ) 
    setCountriesSeeker(event.target.value)
    setCountriesFiltered(filtered)
    console.log(countriesFiltered)
    if (filtered.length === 1) {
      showWeather(filtered[0].capital[0]);
    }
  } 

  const show = (index) => {
    const countryShowed = countriesFiltered[index];
    setCountriesFiltered([countryShowed]);
    setCountriesSeeker(countryShowed.name.common)
    
  };

  return (
    <>
    <div>
      <p className='title'>Find countries</p> <input  value={countriesSeeker}  onChange={handleCountriesChange}/>
      {
  countriesSeeker.length < 1 ? (
    <p></p>
  ) : countriesFiltered.length > 10 ? (
    <p>Too many matches</p>
  ) : countriesFiltered.length === 1 ? (
      countriesFiltered.map((countries, index) => 
      <div key={index} className='container'>
        <h1 className='country-name'>
          {countries.name.common}
        </h1>
        <p>
          Capital {countries.capital}
        </p>
        <p>
          Population {countries.population}
        </p>
        <h1>
          Languages 
        </h1>
        <ul>
          { Object.values(countries.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))
          }
        </ul>
        <img src={countries.flags.png}/>
        {weather && weather.main && weather.weather &&(
          <div>
            <p>
          {countries.capital} Temperature: {weather.main.temp} °C
            </p>
            <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="Weather icon"
          />
          </div>
        
      )}
      </div>
    )
  ) : <div className='countries-names'> {(countriesFiltered.map((countries, index) => 
    
    <li className='country-li' key={index}>{countries.name.common} 
    <div className='button-container'><button className='button-show' onClick={() => show(index)}>show</button></div></li>
   ) 
  )} </div>
}

    </div>
    </>
  )
}

export default App
