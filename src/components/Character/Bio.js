import React from 'react';
import PropTypes from 'prop-types';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    let edit = {
      name: e.target.value
    };
    this.props.editCharacter(edit);
  }

  render() {
    return (
      <div data-character='bio'>
        <input data-character='character-name' name='name' onChange={this.handleInputChange} value={this.props.name} />
        <span data-character='character-build'>{this.props.build}</span>
        <span data-character='character-level'>{this.props.level}</span>
        <span data-character='character-body'>{this.props.body}</span>
        <span data-character='character-buffs'>{this.props.buffs}</span>
        <span data-character='character-armor'>{this.props.armor}</span>
      </div>
    );
  }
}

Player.defaultProps = {
  name: 'NPC',
  build: 0,
  level: 0,
  body: 0,
  buffs: 0,
  armor: ''
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  build: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  body: PropTypes.number.isRequired,
  buffs: PropTypes.number.isRequired,
  armor: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  editCharacter: PropTypes.func.isRequired
};

export default Player;
