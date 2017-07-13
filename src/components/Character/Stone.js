import React from 'react';
import PropTypes from 'prop-types';

class Stone extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if(!this.props.color)
      this.props.stoneClick();
    else
      this.props.stoneClick(this.props.color);
  }

  render() {
    return (
      <div data-stone={(this.props.color || '') + 'stone'} onClick={this.handleClick}>
        <span data-stone-disable={this.props.disable}>
          {this.props.colorLetters[this.props.color] || ''}
        </span>
      </div>
    );
  }
}

Stone.defaultProps = {
  colorLetters: {
    black: 'B',
    blue: 'U',
    red: 'R',
    white: 'W',
    lost: 'W'
  },
  disable: false
};

Stone.propTypes = {
  color: PropTypes.string,
  colorLetters: PropTypes.object,
  disable: PropTypes.bool,
  stoneClick: PropTypes.func
};

export default Stone;
