import React from 'react';
import PropTypes from 'prop-types';

class Stone extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.stoneClick({
      type: this.props.disabled ? 'ENABLE STONE' : 'DISABLE STONE',
      data: this.props.color
    });
  }

  render() {
    return (
      <div className={(this.props.color || '') + 'stone'} onClick={this.handleClick}>
        <span className={this.props.disabled ? 'disabled' : undefined}>
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
    white: 'W'
  },
  disabled: false
};

Stone.propTypes = {
  color: PropTypes.string,
  colorLetters: PropTypes.object,
  disabled: PropTypes.bool,
  stoneClick: PropTypes.func
};

export default Stone;
