import React from "react";
import { Part } from "./part";
import { Details } from "./details";

export const Content = ({ persons, filter }) => {
  const filtered = persons.filter(person => person.name.common.toLowerCase().includes(filter.text.toLowerCase()))
  console.log(filtered)
  if(filter.isOn && filtered.length > 10){
    return (
      <div>
        Too many results... please continue typing
      </div>
      )
    } else if(filter.isOn && filtered.length <= 10 && filtered.length > 1){
      return (
        <div>
          {filtered.map((person) => <Part key={filtered.indexOf(person)} name={person.name.common} />)}
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