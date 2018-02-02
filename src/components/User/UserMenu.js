import React from 'react';
import PropTypes from 'prop-types';

import Button from '../util/styled/Button';

import IconLogout from '../svg/icon/Leave';
import IconRefresh from '../svg/icon/Refresh';
import IconNew from '../svg/icon/Person-Add';

const UserMenu = props => {
  const rest = Object.assign({}, props);
  delete rest.logout;
  delete rest.reloadCharacters;

  return (
    <div {...rest}>
      <Button label='Sign Out'
        callback={props.logout}
        icon={<IconLogout />}
      >
        Sign Out
      </Button>
      <Button label='Reload Characters'
        callback={props.reloadCharacters}
        icon={<IconRefresh />}
      >
        Reload Characters
      </Button>
      <Button label='New Character'
        link='/character'
        icon={<IconNew />}
      >
        New Character
      </Button>
    </div>
  );
}

UserMenu.defaultProps = {
  logout: () => null,
  reloadCharacters: () => null
};

UserMenu.propTypes = {
  logout: PropTypes.func,
  reloadCharacters: PropTypes.func
};

export default UserMenu;
