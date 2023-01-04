import { Component } from 'react';
import PropTypes from 'prop-types';

import { Form } from './ContactForm.styled';
import { Input, Label, Button } from 'commonStyles/coommonStyles.styled';
import { FaPhoneSquareAlt } from 'react-icons/fa';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = ({ target: { name, value } }) => {
    // const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.onFormSubmit(this.state) === null) {
      return;
    } else {
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
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
}
