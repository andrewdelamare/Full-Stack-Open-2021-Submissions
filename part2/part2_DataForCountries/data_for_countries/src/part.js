import React from "react";

export const Part = (props) => {
  
    return (
      <p key={props.id}>
        {props.name} 
      </p>    
    )
  }