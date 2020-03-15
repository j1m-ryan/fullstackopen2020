import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course}</h1>;
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
        name={props.parts[0].name}
        numExercises={props.parts[0].exercises}
      />
      <Part
        name={props.parts[1].name}
        numExercises={props.parts[1].exercises}
      />
      <Part
        name={props.parts[2].name}
        numExercises={props.parts[2].exercises}
      />
    </>
  );
};
const Total = props => {
  let sum = 0;
  props.parts.forEach(p => (sum += p.exercises));

  return (
    <p>
      Number of Exercises
      {" " + sum}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
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
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
