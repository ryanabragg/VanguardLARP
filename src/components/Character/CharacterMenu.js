import React from 'react';
import PropTypes from 'prop-types';

import Button from '../util/styled/Button';

import IconRefresh from '../svg/icon/Refresh';
import IconX from '../svg/icon/X';
import IconSave from '../svg/icon/Save';
import IconBookmark from '../svg/icon/Bookmark';
import IconPersonAdd from '../svg/icon/Person-Add';
import IconPersonBoxed from '../svg/icon/Person-Boxed';
import IconLogin from '../svg/icon/Arrive';
import IconLogout from '../svg/icon/Leave';
import IconButterfly from '../svg/icon/Butterfly';

class CharacterMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      searching: false,
      search: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillUnmount() {
    if(this.timeout)
      clearTimeout(this.timeout)
    this.timeout = undefined;
  }

  handleSearch(e) {
    e.stopPropagation();
    this.setState({search: e.target.value});
    if(this.timeout)
      clearTimeout(this.timeout)
    this.timeout = setTimeout(this.search, 2000);
  }

  search() {
    if(this.timeout)
      clearTimeout(this.timeout)
    this.props.search(this.state.search);
  }

  searchClear() {
    if(this.timeout)
      clearTimeout(this.timeout)
    this.setState({searching: false, search: ''});
    this.props.search();
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.user;
    delete rest.logout;
    delete rest.reloadServices;
    delete rest.link;
    delete rest.save;
    delete rest.reset;
    delete rest.new;

    const anon = Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object;

    return (
      <div {...rest}>
        <Button label={anon ? 'Sign In' : 'Sign Out'}
          link={anon ? '/login' : null}
          callback={anon ? null : this.props.logout}
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
          callback={this.props.reloadServices}
          icon={<IconRefresh />}
        >
          Reload Data
        </Button>
        <Button label='Set Address Link'
          callback={this.props.link}
          icon={<IconBookmark />}
        >
          Set Address Link
        </Button>
        <Button label='Save Character'
          callback={this.props.save}
          icon={<IconSave />}
        >
          Save Character
        </Button>
        <Button label='Reset Character'
          callback={this.props.reset}
          icon={<IconX />}
        >
          Reset Character
        </Button>
        <Button label='Toggle Prodigy'
          callback={this.props.prodigy}
          icon={<IconButterfly />}
        >
          Toggle Prodigy
        </Button>
        <Button label='New Character'
          callback={this.props.new}
          icon={<IconPersonAdd />}
        >
          New Character
        </Button>
      </div>
    );
  }
}

CharacterMenu.defaultProps = {
  user: {}
};

CharacterMenu.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  reloadServices: PropTypes.func,
  link: PropTypes.func,
  save: PropTypes.func,
  reset: PropTypes.func,
  prodigy: PropTypes.func,
  new: PropTypes.func
};

export default CharacterMenu;
