import React from 'react';
import PropTypes from 'prop-types';

import Button from '../util/styled/Button';

import ChevronUp from '../svg/icon/Chevron-Up';
import ChevronDown from '../svg/icon/Chevron-Down';
import CheckboxChecked from '../svg/icon/Checkbox-Checked';
import CheckboxUnchecked from '../svg/icon/Checkbox-Unchecked';

class Ability extends React.Component {
  constructor(props) {
    super(props);

    this.tiers = [
      {value: 0, label: '', short: '-'},
      {value: 1, label: 'Apprentice', short: 'A'},
      {value: 2, label: 'Journeyman', short: 'J'},
      {value: 3, label: 'Craftsman', short: 'C'},
      {value: 4, label: 'Master', short: 'M'},
      {value: 5, label: 'Grandmaster', short: 'G'},
    ];

    this.state = {
      isShowingControls: false
    };

    this.handleView = this.handleView.bind(this);

    this.onChange = this.onChange.bind(this);
    this.toggleCount = this.toggleCount.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

    this.showControls = this.showControls.bind(this);
    this.hideControls = this.hideControls.bind(this);
  }

  handleView(e) {
    this.props.viewDescription(this.props.id);
  }

  onChange(payload) {
    this.props.editCharacter({
      type: 'SKILL',
      data: {
        id: this.props.id,
        count: Number(payload.data),
        source: this.props.source
      }
    });
  }

  toggleCount(e) {
    this.props.editCharacter({
      type: 'SKILL',
      data: {
        id: this.props.id,
        count: Number(!this.props.count),
        source: this.props.source
      }
    });
  }

  increment(e) {
    this.props.editCharacter({
      type: 'SKILL INCREMENT',
      data: {
        id: this.props.id,
        source: this.props.source
      }
    });
  }

  decrement(e) {
    this.props.editCharacter({
      type: 'SKILL DECREMENT',
      data: {
        id: this.props.id,
        source: this.props.source
      }
    });
  }

  showControls(e) {
    this.setState({isShowingControls: true});
  }

  hideControls(e) {
    this.setState({isShowingControls: false});
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.id;
    delete rest.name;
    delete rest.display;
    delete rest.category;
    delete rest.max;
    delete rest.min;
    delete rest.count;
    delete rest.uses;
    delete rest.usesPer;
    delete rest.source;
    delete rest.viewDescription;
    delete rest.editCharacter;

    if(!this.props.display)
      return <div {...rest}><label {...rest} onClick={this.handleView}>{this.props.name}</label></div>;

/*    else if(this.props.category == 'Craft' && this.props.max == 5) {
      input = (
        <div className='ability-input'>
          <Field type='select' name='count'
            value={this.props.count}
            onChange={this.onChange}
            options={this.tiers}
          />
        </div>
      );
    }*/

    let input = undefined;
    if(this.props.max == 1)
      input = (
        <div className='checkbox' onClick={this.toggleCount}>
          {this.props.count ? <CheckboxChecked /> : <CheckboxUnchecked />}
        </div>
      );
    else if(this.props.max == 5 && this.props.category == 'Craft')
      input = (
        <div className='count' onClick={this.showControls}>
          <label className='pointer'>{this.tiers[this.props.count].short}</label>
        </div>
      );
    else
      input = (
        <div className='count' onClick={this.showControls}>
          <label className='pointer'>{this.props.count}</label>
        </div>
      );

    let uses = '';
    switch(this.props.usesPer) {
    case 'per Short Recovery':
      uses = ' short-recovery'; break;
    case 'per Long Recovery':
    default:
      uses = ' long-recovery'; break;
    case 'per Event':
      uses = ' event';
    }

    return (
      <div {...rest}>
        {input}
        <div className={'controls' + (this.state.isShowingControls ? ' show' : '')}>
          <Button callback={this.increment} radius='50%'
            disabled={this.props.max > 0 && this.props.count >= this.props.max}
          >
            <ChevronUp />
          </Button>
          <Button callback={this.decrement} radius='50%'
            disabled={this.props.count <= this.props.min}
          >
            <ChevronDown />
          </Button>
        </div>
        <div className={'uses' + uses}>
          {!this.props.uses ? null : <label>{this.props.uses}</label>}
          {!this.props.uses ? null : <span className='per'>{this.props.usesPer}</span>}
        </div>
        <label onClick={this.handleView}>{this.props.name}</label>
        {!this.state.isShowingControls ? null :
          <div className='click-overlay' onClick={this.hideControls} />
        }
      </div>
    );
  }
}

Ability.defaultProps = {
  name: 'Ability Template',
  display: true,
  category: 'Constant',
  max: 1,
  min: 0,
  count: 0,
  uses: 0,
  usesPer: 'per Long Recovery',
  source: 'build'
};

Ability.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string,
  display: PropTypes.bool,
  category: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  count: PropTypes.number,
  uses: PropTypes.number,
  usesPer: PropTypes.string,
  source: PropTypes.string,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Ability;
