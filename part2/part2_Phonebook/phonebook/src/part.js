import React from "react";
import nService from "./services/namesService";
export const Part = ({ obj, name, number, handleDeleteEvent }) => {
    return (
      <div key={obj.id}>
        <p> {name} {number}</p> 
        <button onClick={
          () => {
            return (
              nService.remove(obj, true), handleDeleteEvent(obj.id)
              )
            } 
          }> Delete </button>
      </div>
          
    )
  }