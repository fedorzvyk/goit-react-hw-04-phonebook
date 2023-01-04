import PropTypes from 'prop-types';
import { Input, Label } from 'commonStyles/coommonStyles.styled';

const Filter = ({ filter, onFilter }) => {
  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={filter}
        onChange={onFilter}
      />
    </Label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
