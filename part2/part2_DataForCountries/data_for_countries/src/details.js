import React from 'react';

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

  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population} </p>
      <h2>Languages</h2>
      <Languages languageList={country.languages}/>
      <img src={country.flags.png} alt='Flag'></img>
    </div>
  )
}
