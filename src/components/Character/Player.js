import React from 'react';
import PropTypes from 'prop-types';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    this.props.editCharacter({
      type: 'CHANGE PLAYER BUILD',
      data: Number(e.target.value)
    });
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.name;
    delete rest.build;
    delete rest.editCharacter;
    return (
      <div {...rest} data-character='player'>
        <div data-character='player-name'>{this.props.name}</div>
        <input data-character='player-build'
          className='number'
          name='build' onChange={this.handleInputChange}
          value={this.props.build}
        />
      </div>
    );
  }
}

Player.defaultProps = {
  name: 'Player Name',
  build: 0
};

Player.propTypes = {
  name: PropTypes.string,
  build: PropTypes.number,
  editCharacter: PropTypes.func.isRequired
};

export default Player;
