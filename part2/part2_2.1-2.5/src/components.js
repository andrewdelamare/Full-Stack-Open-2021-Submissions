import React from "react";

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
const Total = ({ course }) => {
    const parts = course.parts
    const exerciseList = parts.map((part) => part.exercises)
    const sum = exerciseList.reduce((total, exercises)=> total+=exercises, 0)
    return(
      <p>Total number of exercises: {sum}</p>
    ) 
  }
  
const Part = (props) => {
    return (
      <p key={props.id}>
        {props.name}: {props.exercises}
      </p>    
    )
  }
  
const Content = ({ course }) => {
    const parts = course.parts
    return (
      <div>
        {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
export const Course = ({ course }) => {
    return(
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  } 