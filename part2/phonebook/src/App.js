import React, { useState, useEffect } from "react";
import Title from "./Components/Title";
import Numbers from "./Components/Numbers";
import personsService from "./services/persons";
import Notify from "../src/Notify";
import "../src/style.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  setTimeout(() => {
    setMessage(null);
  }, 5000);

  useEffect(() => {
    personsService.getAll().then(response => {
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
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you wish to update their number?`
        )
      ) {
        const newP = { name: newName, number: newNumber };

        const p = persons.find(x => x.name === newName);
        if (p.id === undefined) {
          p.id = persons.length;
        }
        personsService
          .update(p.id, newP)
          .catch(error => setMessage(`Already deleted ${newName}`));
        persons[p.id - 1] = newP;
        setMessage(`Added ${newName}`);
        setPersons([...persons]);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personsService.create(newPerson);
      setPersons(persons.concat(newPerson));
      setMessage(`Added ${newName}`);
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <div>
      <Notify message={message} />
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
