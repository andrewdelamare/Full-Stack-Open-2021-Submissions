import React from "react";
import { Part } from "./part";

export const Content = ({ persons, filter, handleDeleteEvent }) => {
    if(filter.isOn){
      const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.text.toLowerCase()))
      return (
        <div>
          {filtered.map((person) => <Part obj={person} name={person.name} number={person.number} key={person.id} handleDeleteEvent={handleDeleteEvent} />)}
        </div>
      )
    }else{
      return (
      <div>
        {persons.map((person) => <Part obj={person} name={person.name} number={person.number} key={person.id} handleDeleteEvent={handleDeleteEvent} />)}
      </div>
    )}
  }