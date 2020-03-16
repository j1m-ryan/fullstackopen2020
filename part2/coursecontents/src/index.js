import React from "react";
import ReactDOM from "react-dom";

const Course = props => {
  let sum = 0;
  props.course.parts.forEach(p => (sum += p.exercises));
  return (
    <>
      <h1>{props.course.name}</h1>
      {props.course.parts.map(p => (
        <p>
          {p.name} {p.exercises}
        </p>
      ))}
      <strong>total of {sum} exercises</strong>
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      },
      {
        name: "redux",
        exercises: 14,
        id: 4
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
