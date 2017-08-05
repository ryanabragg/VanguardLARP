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
        type: this.props.disabled ? 'ENABLE STONE' : 'DISABLE STONE',
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
  disabled: false
};

Stone.propTypes = {
  color: PropTypes.string,
  colorLetters: PropTypes.object,
  disabled: PropTypes.bool,
  stoneClick: PropTypes.func
};

export default Stone;
