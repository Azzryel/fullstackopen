import React from 'react'

const Header = (props) => {
  
  return (
  <h1>{props.course}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      { parts.map( part => {
        return (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )
    })
  }
    </div>
  )
}

const Part = (props) => {

  return (
    <p>
        {props.part} {props.exercises}
    </p>
  )
}

const Total = ({parts}) => {
  const total =  parts.reduce((total, n) => {
    return (total + n.exercises);
}, 0  ) 

  return (
    <p>Number of exercises {total}</p>
  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
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
    <>
      { courses.map( course => {
        return (
          <Course key={course.id} course={course}  />
        )
    })
  }
    </>
  )
}

export default App;
