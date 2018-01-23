import React from 'react';
import PropTypes from 'prop-types';

import Button from '../util/styled/Button';

import Refresh from '../svg/icon/Refresh';
import Add from '../svg/icon/Add';
import Trash from '../svg/icon/Trash';
import X from '../svg/icon/X';
import Magnifier from '../svg/icon/Magnifier';
import Save from '../svg/icon/Save';
import IconPersonBoxed from '../svg/icon/Person-Boxed';
import IconLogin from '../svg/icon/Arrive';
import IconLogout from '../svg/icon/Leave';

class Menu extends React.Component {
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
    delete rest.reload;
    delete rest.search;
    delete rest.new;
    delete rest.submit;
    delete rest.cancel;
    delete rest.delete;

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
        {typeof this.props.reload != 'function' ? null :
          <Button label='Reload Data'
            callback={this.props.reload}
            icon={<Refresh />}
          >
            Reload Data
          </Button>
        }
        {typeof this.props.search != 'function' ? null :
          <div className='has-dropdown'>
            <div className='dropdown'>
              <input />
              <div className='menu-item' onClick={this.search}>
              </div>
              <div className='menu-item' onClick={this.searchClear}>
              </div>
            </div>
          </div>
        }
        {typeof this.props.new != 'function' ? null :
          <Button label='New Record'
            callback={this.props.new}
            icon={<Add />}
          >
            New
          </Button>
        }
        {typeof this.props.submit != 'function' ? null :
          <Button label='Save Record'
            callback={this.props.submit}
            icon={<Save />}
          >
            Save
          </Button>
        }
        {typeof this.props.cancel != 'function' ? null :
          <Button label='Cancel; Clear Record Selection'
            callback={this.props.cancel}
            icon={<X />}
          >
            Cancel
          </Button>
        }
        {typeof this.props.delete != 'function' ? null :
          <Button label='Delete Record'
            callback={this.props.delete}
            icon={<Trash />}
          >
            Delete
          </Button>
        }
      </div>
    );
  }
}

Menu.defaultProps = {
  user: {}
};

Menu.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  reload: PropTypes.func,
  search: PropTypes.func,
  new: PropTypes.func,
  submit: PropTypes.func,
  cancel: PropTypes.func,
  delete: PropTypes.func,
};

export default Menu;
