import { useState } from "react";

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div>
      {}
      filter shown with{" "}
      <input value={filterValue} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        {}
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        {}
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        {}
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {}
      {persons.map((person, index) => (
        <li key={index}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "672253023", id: 1 },
    { name: "Arnau Gallego", number: "671512305", id: 2 },
    { name: "Marc Fleck", number: "6758493", id: 3 },
    { name: "Josep Rubió", number: "678978345", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      alert("Please enter both name and number");
      return;
    }

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons((prevPersons) => [...prevPersons, personObject]);

      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons =
    filterValue === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
