import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleName = event => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={handleName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <span key={i}>
          {person.name}
          <br />
        </span>
      ))}
    </div>
  );
};

export default App;
