import React from 'react';
import PropTypes from 'prop-types';

import Field from '../util/Field';

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

    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleView = this.handleView.bind(this);
    this.onChange = this.onChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  handleInputChange(e) {
    e.stopPropagation();
    this.props.editCharacter({
      type: 'SKILL',
      data: {
        id: this.props.id,
        count: Number(e.target.type === 'checkbox' ? e.target.checked : e.target.value),
        source: this.props.source
      }
    });
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
    this.onChange({ data: this.props.count + 1 });
  }

  decrement() {
    this.onChange({ data: this.props.count + 1 });
  }

  render() {
    return (
      <div data-character='ability'>
        {this.props.display == 'none'
        ? null
        : this.props.display == 'checkbox'
        ? <input type='checkbox' name='count' onChange={this.handleInputChange} value={this.props.count} checked={this.props.count} />
        : this.props.display == 'tiers'
        ? <Field type='select' name='count'
            value={this.props.count}
            onChange={this.onChange}
            options={this.tiers}
          />
        : <div><Field type='number' name='count'
            value={this.props.count}
            onChange={this.onChange}
          /></div>
        }
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
