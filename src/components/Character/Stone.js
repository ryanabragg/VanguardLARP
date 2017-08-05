import React from 'react';
import PropTypes from 'prop-types';

class Stone extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if(typeof this.props.stoneClick == 'function')
      this.props.stoneClick({
        type: (this.props.disabled ? 'ENABLE ' : 'DISABLE ') + this.props.type.toUpperCase(),
        data: this.props.color
      });
  }

  render() {
    let className = [
      this.props.color,
      'stone',
      this.props.disabled ? 'disabled' : undefined
    ];
    return (
      <div
        className={className.filter(name => name != undefined).join(' ')}
        onClick={this.handleClick}
      >
        {this.props.colorLetters[this.props.color] || ''}
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
  disabled: false,
  type: 'stone'
};

Stone.propTypes = {
  color: PropTypes.string,
  colorLetters: PropTypes.object,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  stoneClick: PropTypes.func
};

export default Stone;
