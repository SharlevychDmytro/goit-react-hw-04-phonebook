import { Component } from 'react';
import { Box } from 'components/Box';
import { FormContacts } from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { ContactsList } from 'components/ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  formSubmit = contact => {
    const some = this.state.contacts.some(
      cont => cont.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (some) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  filterChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <Box bg="background" display="flex" flexDirection="column">
        <h1>Phonebook</h1>
        <FormContacts onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter onChange={this.filterChange} value={this.state.filter} />
        <ContactsList
          contacts={visibleContacts}
          onDelite={this.deleteContact}
        />
      </Box>
    );
  }
}
