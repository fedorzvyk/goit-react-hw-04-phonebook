import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { Box } from '../commonStyles/Box';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localcontacts = JSON.parse(localStorage.getItem('contacts'));
    if (localcontacts) {
      this.setState({ contacts: localcontacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleFformSubmit = data => {
    const repeatingName = this.state.contacts.find(
      contact => contact.name === data.name
    );

    if (repeatingName) {
      alert(`${data.name} is already in contacts.`);
      return null;
    }
    data.id = nanoid();
    this.setState(({ contacts }) => ({
      contacts: [...contacts, data],
    }));
  };

  handleDelete = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = ({ target: { name, value } }) => {
    // const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  render() {
    const { filter } = this.state;
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
          <ContactForm onFormSubmit={this.handleFformSubmit} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gridGap={5}
          as="section"
        >
          <h2>Contacts</h2>
          <Filter filter={filter} onFilter={this.handleFilter} />
          <ContactList
            contacts={this.visibleContacts()}
            onDelete={this.handleDelete}
          />
        </Box>
      </Box>
    );
  }
}
