import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

const Languages = ({languageList}) => {
  const languages = Object.values(languageList)
  const languageLi = languages.map((language) => <li key={languages.indexOf(language)}>{language}</li>)
  

  return(
    <ul>
      {languageLi}
    </ul> 
  )
}

export const Details = ({ country }) => {
  const [weather, setWeather] = useState()
  const capital = country.capital
  const request = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
  useEffect(() => {
    axios
      .get(request)
      .then(response => {
        setWeather(response.data)
        console.log(response.data)
      })
  }, [])
if(weather === undefined){
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population} </p>
      <h2>Languages</h2>
      <Languages languageList={country.languages}/>
      <img src={country.flags.png} alt='Flag'></img>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: ...</p>  
      <p>Feels like: ...</p>
    </div>
  )}else{
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population} </p>
        <h2>Languages</h2>
        <Languages languageList={country.languages}/>
        <img src={country.flags.png} alt='Flag'></img>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather.main.temp} Celcius</p>  
        <p>Feels like: {weather.main.feels_like} Celcius</p>
        <p>Wind speed: {weather.wind.speed} m/s</p>
      </div>
    )
  }
}
