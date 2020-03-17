import React, { useState } from "react";
const Numbers = props => {
  const persons = props.persons;
  const filterWord = props.filterWord;
  if (filterWord === "") {
    return (
      <>
        <h2>Numbers</h2>
        {persons.map((person, i) => (
          <span key={i}>
            {person.name} {person.number}
            <br />
          </span>
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
          <span key={i}>
            {person.name} {person.number}
            <br />
          </span>
        ))}
      </>
    );
  }
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilter] = useState("");

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleFilter = event => {
    setFilter(event.target.value);
  };
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const handleName = event => {
    event.preventDefault();
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filterWord} onChange={handleFilter} />
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleName}>
            add
          </button>
        </div>
      </form>
      <Numbers persons={persons} filterWord={filterWord} />
    </div>
  );
};

export default App;
