import React, { useState, useEffect } from "react";
import Title from "./Components/Title";
import Numbers from "./Components/Numbers";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

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
      const newPerson = {
        name: newName,
        number: newNumber
      };

      setPersons(persons.concat(newPerson));

      axios.post("http://localhost:3000/persons", newPerson).then(response => {
        console.log(response);
      });

      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <div>
      <Title text="Phonebook" />
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
