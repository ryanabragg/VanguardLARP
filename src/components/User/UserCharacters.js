import React from 'react';
import PropTypes from 'prop-types';

import Button from '../util/styled/Button';

import IconNew from '../svg/icon/Person-Add';
import IconPencil from '../svg/icon/Pencil';

const UserCharacters = props => {
  const rest = Object.assign({}, props);
  delete rest.characters;

  return (
    <div {...rest}>
      <h1>Your Characters</h1>
      <ul>
        {props.characters.map(c => (
          <li key={c._id}>
            <Button label='View Character'
              link={`/character/${c._id}`}
              icon={<IconPencil />}
              type='primary'
              radius='50%'
            />
            <p>{c.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

UserCharacters.defaultProps = {
  characters: []
};

UserCharacters.propTypes = {
  characters: PropTypes.array
};

export default UserCharacters;
