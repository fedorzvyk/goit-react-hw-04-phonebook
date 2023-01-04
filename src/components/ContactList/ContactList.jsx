import { List } from './ContactList.styled';
import ContactListItem from '../ContactListItem/ContactListItem';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(({ id, number, name }) => (
        <ContactListItem
          key={id}
          id={id}
          number={number}
          name={name}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
