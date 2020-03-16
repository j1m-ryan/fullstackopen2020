import React from "react";
import ReactDOM from "react-dom";

const Courses = props => {
  return props.course.map(c => <Course course={c} />);
};

const Course = props => {
  const sum = props.course.parts.reduce((s, p) => {
    return (s += p.exercises);
  }, 0);

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
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <Courses course={courses} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
