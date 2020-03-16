import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course.name}</h1>;
};
const Part = props => {
  return (
    <p>
      {props.name} {props.numExercises}
    </p>
  );
};
const Content = props => {
  return (
    <>
      <Part
        name={props.course.parts[0].name}
        numExercises={props.course.parts[0].exercises}
      />
      <Part
        name={props.course.parts[1].name}
        numExercises={props.course.parts[1].exercises}
      />
      <Part
        name={props.course.parts[2].name}
        numExercises={props.course.parts[2].exercises}
      />
    </>
  );
};
const Total = props => {
  let sum = 0;
  props.course.parts.forEach(p => (sum += p.exercises));

  return (
    <p>
      Number of Exercises
      {" " + sum}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
