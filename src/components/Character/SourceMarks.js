import React from 'react';
import PropTypes from 'prop-types';

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
    e.stopPropagation();
    this.setState({custom: e.target.value});
  }

  handleSelect(e) {
    e.stopPropagation();
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
    delete rest.granted;
    delete rest.editCharacter;

    const all = this.props.elements.map(e => e.mark);
    const basic = this.props.elements.filter(e => e.basic).map(e => e.mark);
    const custom = this.props.known.filter(k => all.indexOf(k) == -1);

    let options = (this.props.mastery ? all : basic).concat(custom);

    let display = this.props.known.slice();
    while(this.props.limit > display.length)
      display.push('');

    return (
      <div {...rest}>
        <ul>
          {this.props.granted.map((mark, index) => (
            <li key={mark || index} className='granted'>
              <label>{mark}</label>
            </li>
          ))}
          {display.map((d, index) => (
            <li key={d || index} className='known'>
              <select name={d} onChange={this.handleSelect} value={d}>
                <option value=''></option>;
                {(index == 0 ? basic : options).map((o, i) => {
                  return <option key={o} value={o}>{o}</option>;
                })}
              </select>
            </li>
          ))}
        </ul>
        {this.props.mastery && this.props.limit > this.props.known.length && (
          <div className='customize'>
            <label>Custom Element:</label>
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
    mark: 'Acid'
  }],
  limit: 0,
  mastery: false,
  known: [],
  granted: []
};

SourceMarks.propTypes = {
  elements: PropTypes.array,
  limit: PropTypes.number,
  mastery: PropTypes.bool,
  known: PropTypes.array,
  granted: PropTypes.array,
  editCharacter: PropTypes.func.isRequired
};

export default SourceMarks;
