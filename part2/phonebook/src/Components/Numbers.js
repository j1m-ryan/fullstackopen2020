import React from "react";
import Individual from "./Individual";

const Numbers = props => {
  const persons = props.persons;
  console.log("top of Numbers");

  const filterWord = props.filterWord;

  if (filterWord === "") {
    return (
      <>
        <h2>Numbers</h2>
        {persons.map((person, i) => (
          <Individual
            key={i}
            name={person.name}
            number={person.number}
            result={i}
          />
        ))}
      </>
    );
  } else {
    let newObj = [];
    console.log("newObj is a", typeof newObj);
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.includes(filterWord)) {
        console.log("person name", persons[i].name, "filterword", filterWord);
        newObj = newObj.concat({
          name: persons[i].name,
          number: persons[i].number
        });
      }
    }
    console.log(newObj);

    return (
      <>
        <h2>Numbers</h2>
        {newObj.map((person, i) => (
          <Individual
            key={i}
            name={person.name}
            number={person.number}
            result={i}
          />
        ))}
      </>
    );
  }
};
export default Numbers;
