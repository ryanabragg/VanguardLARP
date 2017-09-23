import React from 'react';
import PropTypes from 'prop-types';

import AbilityGroup from './AbilityGroup';
import Stone from './Stone';

class SourceMarks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      custom: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAddCustom = this.handleAddCustom.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      custom: e.target.value
    });
  }

  handleSelect(e) {
    e.preventDefault();
    let data = this.props.known.slice();
    while(this.props.limit > data.length)
      data.push('');
    let pos = data.indexOf(e.target.name);
    if(e.target.value == '' || data.indexOf(e.target.value) == -1)
      data[pos] = e.target.value;
    this.props.editCharacter({
      type: 'SOURCE MARK',
      data: data.filter(mark => mark != '')
    });
  }

  handleAddCustom() {
    let data = this.props.known.slice();
    if(data.indexOf(this.state.custom) == -1)
      data = data.concat(this.state.custom);
    if(this.props.limit > this.props.known.length) {
      this.props.editCharacter({
        type: 'SOURCE MARK',
        data: data
      });
      this.setState({
        custom: ''
      });
    }
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.elements;
    delete rest.limit;
    delete rest.mastery;
    delete rest.known;
    delete rest.editCharacter;
    const allElements = this.props.elements.map(element => element.mark);
    const basicElements = this.props.elements.filter(element => element.basic).map(element => element.mark);
    const custom = this.props.known.filter(mark => allElements.indexOf(mark) == -1);
    const available = (this.props.mastery ? allElements : basicElements).concat(custom);
    let display = this.props.known.map(mark => {return {element: mark, source: 'known'};});
    while(this.props.limit > display.length)
      display.push({element: '', source: 'known'});
    if(this.props.mastery)
      display = basicElements.map(mark => {
        return {
          element: mark,
          source: this.props.known.indexOf(mark) == -1 ? 'mastery' : 'known'
        };
      }).concat(display.filter(mark => basicElements.indexOf(mark.element) == -1));
    return (
      <div {...rest}>
        <ul>
          {display.map((mark, index) => (
            <li key={mark.element || index} className={mark.source}>
              <select name={mark.element} onChange={this.handleSelect} value={mark.element}>
                <option value=''></option>;
                {available.map((element, i) => {
                  return <option key={element} value={element}>{element}</option>;
                })}
              </select>
            </li>
          ))}
        </ul>
        {this.props.mastery && this.props.limit > this.props.known.length && (
          <div className='customize'>
            <label>Custom Element</label>
            <input onChange={this.handleInputChange} value={this.state.custom} />
            <button onClick={this.handleAddCustom}>Add</button>
          </div>
        )}
      </div>
    );
  }
}

SourceMarks.defaultProps = {
  elements: [{
    basic: true,
    mark: 'Earth'
  }, {
    basic: true,
    mark: 'Fire'
  }, {
    basic: true,
    mark: 'Water'
  }, {
    basic: true,
    mark: 'Wind'
  }, {
    basic: false,
    mark: 'Crystal'
  }, {
    basic: false,
    mark: 'Plasma'
  }, {
    basic: false,
    mark: 'Ice'
  }, {
    basic: false,
    mark: 'Lightning'
  }, {
    basic: false,
    mark: 'Light'
  }, {
    basic: false,
    mark: 'Darkness'
  }, {
    basic: false,
    mark: 'Magic'
  }],
  limit: 0,
  mastery: false,
  known: []
};

SourceMarks.propTypes = {
  elements: PropTypes.array,
  limit: PropTypes.number,
  mastery: PropTypes.bool,
  known: PropTypes.array,
  editCharacter: PropTypes.func.isRequired
};

export default SourceMarks;
