import React from "react";
import nService from "./services/namesService";
export const Part = ({ obj, name, number, handleDeleteEvent }) => {
    return (
      <div>
        <p> {name} {number}</p> 
        <button onClick={ () => {
          if(nService.remove(obj, true)){
            handleDeleteEvent(obj.id, obj.name)
          }
        }
          }> Delete </button>
      </div>
          
    )
  }