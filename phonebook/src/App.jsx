import React, { useEffect, useState } from 'react';
import NumbersList from './components/Numerslist';
import AddPersonForm from './components/AddPersonForm';
import Filter from './components/Filter';
import personsService from './services/persons.jsx';
import Message from './components/Message.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); 
  
  useEffect(() => {
    console.log('effect');
    personsService.getAll().then(initialPersons => {
      console.log('promise fulfilled');
      setPersons(initialPersons);
    });
  }, []);

  const deletePerson = (i) => {
    if (window.confirm('Do you really want to delete this person?')) {
      const personToDelete = persons[i];

      const id = personToDelete.id;

      personsService
        .deletePerson(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          console.log('Person deleted successfully.');
        })
        .catch((error) => {
          setMessage(`${persons.name} has already delete`);
          setMessageType('error')
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);
    const phoneExists = persons.some((person) => person.number === newPhone);

    const newEntry = { name: newName, number: newPhone };

    if (nameExists || phoneExists) {
      const existingPerson = persons.find((person) => person.name === newName);

      if (
        window.confirm(
          `${existingPerson.name} already exists in the phonebook, do you want to replace the number?`
        )
      ) {
        personsService
          .update(existingPerson.id, newEntry)
          .then((updatedPerson) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setMessage(`${newName} updated`);
            setMessageType('message');
            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
            console.log('Number replaced successfully.');
          })
          .catch((error) => {
            console.error('Error replacing number', error);
            setMessage(`${newName} information was already removed from server`);
            setMessageType('error');
          });
      }
    } else {
      const addPerson = () => {
        personsService
          .create(newEntry)
          .then((returnedPerson) => {
            console.log(returnedPerson);
            setPersons([...persons, returnedPerson]);
            setMessage(`${newName} added`);
            setMessageType('message');
            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
          })
          .catch((error) => {
            console.error('Error adding person', error);
            setMessage('Error adding person');
            setMessageType('error');
          });
      };

      setNewName('');
      setNewPhone('');
      addPerson(newEntry);
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    const filtered = persons.filter((persons) =>
      persons.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPersons(filtered);
  };

  return (
    <div>
      <Message message={message} type={messageType} />
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <AddPersonForm
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <NumbersList
        persons={filteredPersons.length > 0 ? filteredPersons : persons}
        setPersons={setPersons}
        handleDeleteClick={deletePerson}
      />
    </div>
  );
};

export default App;


