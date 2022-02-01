import React from "react";
import nService from "./services/namesService";
export const Part = ({ obj, id, name, number, handleDeleteEvent }) => {
  console.log(obj)
    return (
      <div>
        <p key={id.value}> {name} {number}</p> 
        <button  key={`${id}.1`} onClick={() => {return (nService.remove(obj, true), handleDeleteEvent())} }> Delete </button>
      </div>
          
    )
  }