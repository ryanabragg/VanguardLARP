import React from 'react';
import PropTypes from 'prop-types';

import IconMoreVertical from '../svg/IconMoreVertical';

class Levels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.clearClick = this.clearClick.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  clearClick(e) {
    e.stopPropagation();
  }

  handleIconClick(e) {
    e.preventDefault();
    this.setState({show: !this.state.show});
  }

  handleInputChange(e) {
    e.preventDefault();
    let known = this.props.known.filter(k => k.level == e.target.name);
    if(known.length)
      this.props.editCharacter({
        type: 'SKILL',
        data: {
          id: known[0].id,
          count: 0,
          source: Number(e.target.name)
        }
      });
    this.props.editCharacter({
      type: 'SKILL',
      data: {
        id: e.target.value,
        count: 1,
        source: Number(e.target.name)
      }
    });
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.level;
    delete rest.interval;
    delete rest.icon;
    delete rest.domains;
    delete rest.T1;
    delete rest.T2;
    delete rest.T3;
    delete rest.known;
    delete rest.editCharacter;
    const { level, interval, T1, T2, T3 } = this.props;
    const domainNames = this.props.domains.map(rule => rule.group)
      .filter((rule, index, self) => self.indexOf(rule) == index);
    const options = this.props.domains
      .concat(
        domainNames.map(domain => { return {_id: '', tier: '1', name: '', group: domain}; }),
        domainNames.map(domain => { return {_id: '', tier: '2', name: '', group: domain}; }),
        domainNames.map(domain => { return {_id: '', tier: '3', name: '', group: domain}; })
      )
      .sort((a, b) => {
        if(a.group == b.group && a.tier == b.tier)
          return a.name > b.name ? 1 : -1;
        else if(a.group == b.group)
          return a.tier > b.tier ? 1 : -1;
        else if(a.group == 'Generic')
          return -1;
        else if(b.group == 'Generic')
          return 1;
        else if(a.group == 'Burn')
          return 1;
        else if(b.group == 'Burn')
          return -1;
        else
          return a.group > b.group ? 1 : -1;
      });
    let list = new Array(Math.floor(Math.max(0, level) / interval))
      .fill({})
      .map((item, index) => {
        let data = {
          id: '',
          level: (index + 1) * interval,
          name: ''
        };
        let known = this.props.known.filter(skill => skill.level == data.level);
        if(known.length)
          data = known[0];
        data.tier = data.level == interval ? '1' : data.level == 2 * interval ? '2' : '3';
        return data;
      });

    let warnings = [null, null, null];
    if(level < interval)
      warnings[0] = <label className='T1'>{`Level ${interval} needed for tier one.`}</label>;
    else if(!T1)
      warnings[0] = <label className='T1'>Insufficient non-domain build for tier one.</label>;
    if(level < interval * 2)
      warnings[1] = <label className='T2'>{`Level ${interval * 2} needed for tier two.`}</label>;
    else if(!T2)
      warnings[1] = <label className='T2'>Insufficient non-domain build for tier two.</label>;
    if(level < interval * 3)
      warnings[2] = <label className='T3'>{`Level ${interval * 3} needed for tier three.`}</label>;
    else if(!T3)
      warnings[2] = <label className='T3'>Insufficient non-domain build for tier three.</label>;

    return (
      <div {...rest}>
        <div className='icon' onClick={this.handleIconClick}>
          {this.props.icon}
          <div onClick={this.clearClick}
            className={'dropdown' + (this.state.show ? ' show' : '')}
          >
            {list.map(item => {
              return (
                <div className='level' key={item.level}>
                  <label>{'Level ' + item.level}</label>
                  <select
                    name={item.level}
                    value={item.id}
                    onChange={this.handleInputChange}
                  >
                    <option default value=''></option>
                    {options.filter(option => option.tier <= item.tier)
                      .map((option, i) => (option._id
                        ? <option key={i} name={item.level} value={option._id}>{option.name}</option>
                        : <option key={i} disabled>{`─ ${option.group} Tier ${option.tier}`}</option>
                      ))
                    }
                  </select>
                </div>
              );
            })}
            {warnings[0]}
            {warnings[1]}
            {warnings[2]}
          </div>
        </div>
      </div>
    );
  }
}

Levels.defaultProps = {
  level: 0,
  interval: 5,
  icon: <IconMoreVertical color='inherit' />,
  domains: [],
  known: [],
  T1: false,
  T2: false,
  T3: false
};

Levels.propTypes = {
  level: PropTypes.number,
  interval: PropTypes.number,
  icon: PropTypes.element,
  domains: PropTypes.array,
  known: PropTypes.array,
  T1: PropTypes.bool,
  T2: PropTypes.bool,
  T3: PropTypes.bool,
  editCharacter: PropTypes.func.isRequired
};

export default Levels;
