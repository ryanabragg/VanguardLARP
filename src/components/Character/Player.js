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
      player: {
        build: Number(e.target.value)
      }
    };
    this.props.editCharacter(edit);
  }

  render() {
    return (
      <div data-character='player'>
        <span data-character='player-name'>{this.props.name}</span>
        <input data-character='player-build' name='build' onChange={this.handleInputChange} value={this.props.build} />
      </div>
    );
  }
}

Player.defaultProps = {
  name: 'Unknown',
  build: 0
};

Player.propTypes = {
  name: PropTypes.string,
  build: PropTypes.number,
  editCharacter: PropTypes.func.isRequired
};

export default Player;
