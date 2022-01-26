import React, {useState} from "react";
import { Details } from "./details";

const JustText = ({ handleMore, id, name}) => {
  return(
    <div>
        <p key={id}>
          {name} 
        </p> 
        <button onClick={handleMore}>
          Show More
        </button>   
    </div>
  )
}

export const Part = (props) => {
  const [more, setMore] = useState(false)
  const handleMore = (event) => {
    event.preventDefault()
    more === true ? setMore(false) : setMore(true)
    }
  
  const showMore = (more) => {
    switch(more){
    case true:
      return(
        <div>
          <Details country={props.country} />
          <button onClick={handleMore} >Hide</button>
        </div>
        
      )
    case false: 
      return(
        <JustText handleMore={handleMore} id={props.id} name={props.name} />
      )
    default:
      return(
        console.log('An issue occured...')
      )
  }}
  return(
    <div>
      {showMore(more)}
    </div>
  )
  
}