import React, { useState } from "react";
import Individual from "./Individual";
import personsService from "../services/persons";

const Numbers = props => {
  const [update, setUpdate] = useState(false);
  let persons = props.persons;
  const filterWord = props.filterWord;

  if (update) {
    console.log("happened because update is true");
    personsService.getAll().then(response => {
      persons = response.data;
    });

    setUpdate(false);
    console.log("persons", persons);
  }

  const deletePerson = (id, name, i) => {
    console.log("I deleted", name, "whos id is", id);
    console.log("persons type is", typeof persons);
    persons = persons.filter(a => a.id !== id);
    console.log("persons", persons);
    personsService.remove(id, name);
    setUpdate(true);
  };

  if (filterWord === "") {
    return (
      <>
        <h2>Numbers</h2>
        {persons.map((person, i) => (
          <>
            <Individual
              key={i}
              name={person.name}
              number={person.number}
              id={person.id}
              result={i}
              persons={props.persons}
            />
            <button
              key={i}
              onClick={() => deletePerson(person.id, person.name, i)}
            >
              delete
            </button>
            <br />
          </>
        ))}
      </>
    );
  } else {
    let newObj = [];
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.includes(filterWord)) {
        newObj = newObj.concat({
          name: persons[i].name,
          number: persons[i].number,

          id: persons[i].id
        });
      }
    }

    return (
      <>
        <h2>Numbers</h2>
        {newObj.map((person, i) => (
          <>
            <Individual
              key={i}
              name={person.name}
              number={person.number}
              id={person.id}
              result={i}
              persons={props.persons}
            />
            <button
              key={i}
              onClick={() => deletePerson(person.id, person.name, i)}
            >
              delete
            </button>
            <br />
          </>
        ))}
      </>
    );
  }
};
export default Numbers;
