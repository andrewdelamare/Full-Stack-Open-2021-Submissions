import React from "react";

export const Part = (props) => {
  
    return (
      <p key={props.id}>
        {props.name} {props.number}
      </p>    
    )
  }