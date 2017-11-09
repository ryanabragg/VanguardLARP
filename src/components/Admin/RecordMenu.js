import React from 'react';
import PropTypes from 'prop-types';

import Button from '../util/styled/Button';

import Refresh from '../svg/icon/Refresh';
import Add from '../svg/icon/Add';
import Trash from '../svg/icon/Trash';
import X from '../svg/icon/X';
import Magnifier from '../svg/icon/Magnifier';
import Save from '../svg/icon/Save';

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
    delete rest.reload;
    delete rest.search;
    delete rest.new;
    delete rest.submit;
    delete rest.cancel;
    delete rest.delete;

    return (
      <div {...rest}>
        {typeof this.props.reload != 'function' ? null :
          <Button label='Reload Data'
            callback={this.props.reload}
            radius='100%'
          >
            <Refresh />
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
            radius='100%'
          >
            <Add />
          </Button>
        }
        {typeof this.props.submit != 'function' ? null :
          <Button label='Submit Record'
            callback={this.props.submit}
            radius='100%'
          >
            <Save />
          </Button>
        }
        {typeof this.props.cancel != 'function' ? null :
          <Button label='Cancel; Clear Record Selection'
            callback={this.props.cancel}
            radius='100%'
          >
            <X />
          </Button>
        }
        {typeof this.props.delete != 'function' ? null :
          <Button label='Delete Record'
            callback={this.props.delete}
            radius='100%'
          >
            <Trash />
          </Button>
        }
      </div>
    );
  }
}

Menu.defaultProps = {};

Menu.propTypes = {
  reload: PropTypes.func,
  search: PropTypes.func,
  new: PropTypes.func,
  submit: PropTypes.func,
  cancel: PropTypes.func,
  delete: PropTypes.func,
};

export default Menu;
