import { useState } from 'react';
import PropTypes from 'prop-types';

import { Form } from './ContactForm.styled';
import { Input, Label, Button } from 'commonStyles/coommonStyles.styled';
import { FaPhoneSquareAlt } from 'react-icons/fa';

export default function ContactForm({ onFormSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (onFormSubmit({ name, number }) === null) {
      return;
    } else {
      setNumber('');
      setName('');
    }
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={e => {
            setNumber(e.target.value);
          }}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">
        <FaPhoneSquareAlt /> Add contact
      </Button>
    </Form>
  );
}

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
