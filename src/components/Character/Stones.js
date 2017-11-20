import React from 'react';
import PropTypes from 'prop-types';

import Stone from './Stone';

class Stones extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.stones;
    delete rest.type;
    delete rest.stoneClick;
    let stones = [];
    if(this.props.stones <= 0)
      return null;
    else if(typeof this.props.stones == 'number')
      stones = new Array(this.props.stones).fill({color: undefined, disabled: false});
    else if(this.props.stones.length == 0)
      return null;
    else
      stones = [].concat.apply([], this.props.stones.map(stone => {
        if(stone.count <= 0)
          return null;
        return new Array(stone.count).fill(null).map((i, index) => {
          return {color: stone.color, disabled: index >= stone.count - stone.disabled};
        });
      })).filter(stone => stone != null);
    return (
      <div {...rest}>
        {stones.map((stone, index) => (
          <Stone
            key={index}
            color={stone.color}
            disabled={stone.disabled}
            type={this.props.type}
            stoneClick={this.props.stoneClick}
          />
        ))}
      </div>
    );
  }
}

Stones.defaultProps = {
  stones: 0
};

Stones.propTypes = {
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
  type: PropTypes.string,
  stoneClick: PropTypes.func
};

export default Stones;
