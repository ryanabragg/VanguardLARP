import React from 'react';
import PropTypes from 'prop-types';

import Stone from './Stone';

class Stones extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stones = [];
    if(typeof this.props.stones === 'number')
      stones = new Array(this.props.stones).fill(null);
    else
      stones = [].concat.apply([], Object.keys(this.props.stones).map(key => new Array(this.props.stones[key]).fill(key)));
    return (
      <div data-character={this.props.label || 'stones'}>
        {stones.map((stone, index) => <Stone key={index} color={stone} disable={stone === 'lost'} stoneClick={this.props.stoneClick} />)}
      </div>
    );
  }
}

//Stones.defaultProps = {};

Stones.propTypes = {
  label: PropTypes.string,
  stones: PropTypes.oneOfType([
    PropTypes.shape({
      blue: PropTypes.number,
      black: PropTypes.number,
      red: PropTypes.number,
      white: PropTypes.number,
      lost: PropTypes.number
    }),
    PropTypes.number
  ]).isRequired,
  stoneClick: PropTypes.func
};

export default Stones;
