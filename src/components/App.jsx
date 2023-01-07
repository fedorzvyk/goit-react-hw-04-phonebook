import { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { Box } from '../commonStyles/Box';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = data => {
    const repeatingName = contacts.find(contact => contact.name === data.name);

    if (repeatingName) {
      alert(`${data.name} is already in contacts.`);
      return null;
    }
    data.id = nanoid();
    setContacts(contacts => [...contacts, data]);
  };

  const handleDelete = id => {
    setContacts(contacts => {
      return contacts.filter(contact => contact.id !== id);
    });
  };

  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gridGap={5}
      maxWidth="500px"
      my={5}
      mx="auto"
      py={6}
      px={4}
      bg="muted"
      border="normal"
      borderRadius="normal"
      as="main"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gridGap={5}
        as="section"
      >
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={handleFormSubmit} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gridGap={5}
        as="section"
      >
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onFilter={e => {
            setFilter(e.target.value);
          }}
        />
        <ContactList contacts={visibleContacts()} onDelete={handleDelete} />
      </Box>
    </Box>
  );
}
