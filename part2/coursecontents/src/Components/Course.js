import React from "react";

const Course = props => {
  const sum = props.course.parts.reduce((s, p) => {
    return (s += p.exercises);
  }, 0);

  return (
    <>
      <h1>{props.course.name}</h1>
      {props.course.parts.map(p => (
        <p key={p.id}>
          {p.name} {p.exercises}
        </p>
      ))}
      <strong>total of {sum} exercises</strong>
    </>
  );
};
export default Course;
