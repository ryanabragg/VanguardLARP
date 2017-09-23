import React from 'react';
import PropTypes from 'prop-types';

class Box extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.label;
    delete rest.width;
    delete rest.factor;
    delete rest.color;
    return (
      <div {...rest}>
        <label className='floating'>{this.props.label}</label>
        {this.props.children}
      </div>
    );
  }
}

//Box.defaultProps = {};

Box.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default Box;
