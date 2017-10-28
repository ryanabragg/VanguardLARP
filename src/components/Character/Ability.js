import React from 'react';
import PropTypes from 'prop-types';

import Field from '../util/Field';
import Add from '../svg/icon/Add';
import Remove from '../svg/icon/Remove';

class Ability extends React.Component {
  constructor(props) {
    super(props);

    this.tiers = [
      {value: 1, label: 'Apprentice' },
      {value: 2, label: 'Journeyman' },
      {value: 3, label: 'Craftsman' },
      {value: 4, label: 'Master' },
      {value: 5, label: 'Grandmaster' },
    ];

    this.handleView = this.handleView.bind(this);
    this.onChange = this.onChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  handleView(e) {
    e.preventDefault();
    this.props.viewDescription(this.props.id);
  }

  onChange(payload) {
    this.props.editCharacter({
      type: 'SKILL',
      data: {
        id: this.props.id,
        count: Number(payload.data),
        source: this.props.source
      }
    });
  }

  increment() {
    this.props.editCharacter({
      type: 'SKILL INCREMENT',
      data: {
        id: this.props.id,
        source: this.props.source
      }
    });
  }

  decrement() {
    this.props.editCharacter({
      type: 'SKILL DECREMENT',
      data: {
        id: this.props.id,
        source: this.props.source
      }
    });
  }

  render() {
    let input = undefined;
    switch(this.props.display){
    case 'none':
      input = null;
      break;
    case 'tiers':
      input = (
        <div className='ability-input'>
          <Field type='select' name='count'
            value={this.props.count}
            onChange={this.onChange}
            options={this.tiers}
          />
        </div>
      );
      break;
    case 'checkbox':
      input = (
        <div className='ability-input'>
          <Field type='checkbox' name='count'
            value={this.props.count}
            onChange={this.onChange}
          />
        </div>
      );
      break;
    default:
      input = (
        <div className='ability-input'>
          <div className='button' onClick={this.increment}>
            <Add color='inherit' />
          </div>
          <div className='button' onClick={this.decrement}>
            <Remove color='inherit' />
          </div>
          <Field type='number' name='count'
            value={this.props.count}
          />
        </div>
      );
    }
    return (
      <div className='ability'>
        {input}
        <label onClick={this.handleView}>{this.props.name}</label>
      </div>
    );
  }
}

Ability.defaultProps = {
  count: 0,
  source: 'build'
};
//@todo: replace count with purchases & uses
Ability.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string.isRequired,
  display: PropTypes.string,
  count: PropTypes.number,
  source: PropTypes.string,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Ability;
