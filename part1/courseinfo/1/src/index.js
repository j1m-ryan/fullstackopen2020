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
      <Part name={props.section1} numExercises={props.exerciseNum1} />
      <Part name={props.section2} numExercises={props.exerciseNum2} />
      <Part name={props.section3} numExercises={props.exerciseNum3} />
    </>
  );
};
const Total = props => {
  return <p>Number of Exercises {props.exerciseNums}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        section1={part1}
        exerciseNum1={exercises1}
        section2={part2}
        exerciseNum2={exercises2}
        section3={part3}
        exerciseNum3={exercises3}
      />
      <Total exerciseNums={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
