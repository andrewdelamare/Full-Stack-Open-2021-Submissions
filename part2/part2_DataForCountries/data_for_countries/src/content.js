import React from "react";
import { Part } from "./part";
import { Details } from "./details";

export const Content = ({ countries, filter}) => {
  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter.text.toLowerCase()))
  if(filter.isOn && filtered.length > 10){
    return (
      <div>
        Too many results... please continue typing
      </div>
      )
    } else if(filter.isOn && filtered.length <= 10 && filtered.length > 1){
      return (
        <div>
          {filtered.map((country) => <Part key={filtered.indexOf(country)} name={country.name.common} country={country} />)}
        </div> 
    )} else if(filter.isOn && filtered.length === 1){
      return (
        <div>
          <Details country={filtered[0]} />
        </div> 
    )} else {
      return (
      <div>
        Start typing to search for a country
      </div>
    )}
  }