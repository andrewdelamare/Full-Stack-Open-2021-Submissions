import React from "react";
import { Content } from "./content";
export const Numbers = ({ persons, filter, handleDeleteEvent }) => {
    return(
      <div>
        <h2>Numbers</h2>
        <Content persons={persons} filter={filter} handleDeleteEvent={handleDeleteEvent} />
     </div> 
    )
  }