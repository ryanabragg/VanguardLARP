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
      stones = new Array(this.props.stones).fill({color: undefined, disabled: false});
    else
      stones = [].concat.apply([], this.props.stones.map(stone => {
        return new Array(stone.count).fill(null).map((i, index) => {
          return {color: stone.color, disabled: index < stone.disabled};
        });
      }));
    return (
      <div data-character={this.props.label || 'stones'}>
        {stones.map((stone, index) => <Stone key={index} color={stone.color} disabled={stone.disabled} stoneClick={this.props.stoneClick} />)}
      </div>
    );
  }
}

//Stones.defaultProps = {};

Stones.propTypes = {
  label: PropTypes.string,
  stones: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        count: PropTypes.number,
        disabled: PropTypes.number
      })
    ),
    PropTypes.number
  ]).isRequired,
  stoneClick: PropTypes.func
};

export default Stones;
