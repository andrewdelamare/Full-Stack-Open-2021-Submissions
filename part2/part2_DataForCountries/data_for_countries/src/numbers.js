import React from "react";
import { Content } from "./content";
export const Numbers = ({ countries, filter}) => {
    return(
      <div>
        <h2>Countries</h2>
        <Content countries={countries} filter={filter} />
     </div> 
    )
  }