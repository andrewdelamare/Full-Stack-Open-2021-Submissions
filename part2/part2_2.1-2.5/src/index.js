import React from 'react';
import ReactDOM from 'react-dom';

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

const Course = ({ course }) => {
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
} 

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((c)=><Course course={c} key={c.id}/>)}  
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
