import React from 'react';
import PropTypes from 'prop-types';

class Ability extends React.Component {
  constructor(props) {
    super(props);

    this.handleView = this.handleView.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  render() {
    let input = null;
    if(this.props.display === 'checkbox')
      input = <input type='checkbox' name='count' onChange={this.handleInputChange} value={this.props.count} checked={this.props.count} />;
    else if(this.props.display === 'tiers') {
      input = (
        <select name='count' onChange={this.handleInputChange} value={this.props.count}>
          <option value={0}></option>
          <option value={1}>Apprentice</option>
          <option value={2}>Journeyman</option>
          <option value={3}>Craftsman</option>
          <option value={4}>Master</option>
          <option value={5}>Grandmaster</option>
        </select>
      );
    }
    else
      input = <input type='number' name='count' onChange={this.handleInputChange} value={this.props.count} />;
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
