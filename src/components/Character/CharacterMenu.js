import React from 'react';
import PropTypes from 'prop-types';

import Button from '../util/styled/Button';

import IconRefresh from '../svg/icon/Refresh';
import IconReset from '../svg/icon/Undo';
import IconSave from '../svg/icon/Save';
import IconTrash from '../svg/icon/Trash';
import IconBookmark from '../svg/icon/Bookmark';
import IconPersonAdd from '../svg/icon/Person-Add';
import IconPersonBoxed from '../svg/icon/Person-Boxed';
import IconLogin from '../svg/icon/Arrive';
import IconLogout from '../svg/icon/Leave';
import IconButterfly from '../svg/icon/Butterfly';

const CharacterMenu = (props) => {
  const rest = Object.assign({}, props);
  delete rest.user;
  delete rest.logout;
  delete rest.reloadServices;
  delete rest.link;
  delete rest.save;
  delete rest.reset;
  delete rest.prodigy;
  delete rest.new;
  delete rest.delete;
  delete rest.saved;
  delete rest.linked;

  const anon = Object.keys(props.user).length === 0 && props.user.constructor === Object;

  return (
    <div {...rest}>
      <Button label={anon ? 'Sign In' : 'Sign Out'}
        link={anon ? '/login' : null}
        callback={anon ? null : props.logout}
        icon={anon ? <IconLogin /> : <IconLogout />}
      >
        {anon ? 'Sign In' : 'Sign Out'}
      </Button>
      {anon ? null :
        <Button label='Account'
          link='/account'
          icon={<IconPersonBoxed />}
        >
          Account
        </Button>
      }
      <Button label='Reload Rules'
        callback={props.reloadServices}
        icon={<IconRefresh />}
      >
        Reload Data
      </Button>
      <Button label='Toggle Prodigy'
        callback={props.prodigy}
        icon={<IconButterfly />}
      >
        Toggle Prodigy
      </Button>
      <Button label='Set Address Link'
        callback={props.link}
        icon={<IconBookmark />}
      >
        Set Address Link
      </Button>
      <Button label='New Character'
        callback={props.new}
        icon={<IconPersonAdd />}
      >
        New Character
      </Button>
      {!props.saved && !props.linked ? null : (
        <Button label='Reset Character'
          callback={props.reset}
          icon={<IconReset />}
        >
          Reset Character
        </Button>
      )}
      {!props.user._id ? null : (
        <Button label='Save Character'
          callback={props.save}
          icon={<IconSave />}
        >
          Save Character
        </Button>
      )}
      {!props.saved ? null : (
        <Button label='Delete Character'
          callback={props.delete}
          icon={<IconTrash />}
        >
          Delete Character
        </Button>
      )}
    </div>
  );
}

CharacterMenu.defaultProps = {
  user: {},
  saved: false,
  linked: false
};

CharacterMenu.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  reloadServices: PropTypes.func,
  link: PropTypes.func,
  save: PropTypes.func,
  reset: PropTypes.func,
  prodigy: PropTypes.func,
  new: PropTypes.func,
  delete: PropTypes.func,
  saved: PropTypes.bool,
  linked: PropTypes.bool
};

export default CharacterMenu;
