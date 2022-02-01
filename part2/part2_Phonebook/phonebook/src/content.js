import React from "react";
import { Part } from "./part";

export const Content = ({ persons, filter, handleDeleteEvent }) => {
    if(filter.isOn){
      const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.text.toLowerCase()))
      return (
        <div>
          {filtered.map((person) => <Part obj={person} id={person.id} name={person.name} number={person.number} handleDeleteEvent={handleDeleteEvent} />)}
        </div>
      )
    }else{
      return (
      <div>
        {persons.map((person) => <Part obj={person} id={person.id} name={person.name} number={person.number} handleDeleteEvent={handleDeleteEvent} />)}
      </div>
    )}
  }