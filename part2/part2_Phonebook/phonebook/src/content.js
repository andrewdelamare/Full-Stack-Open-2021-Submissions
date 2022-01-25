import React from "react";
import { Part } from "./part";

export const Content = ({ persons, filter }) => {
    if(filter.isOn){
      const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.text.toLowerCase()))
      return (
        <div>
          {filtered.map((person) => <Part key={person.id} name={person.name} number={person.number} />)}
        </div>
      )
    }else{
      return (
      <div>
        {persons.map((person) => <Part key={person.id} name={person.name} number={person.number} />)}
      </div>
    )}
  }