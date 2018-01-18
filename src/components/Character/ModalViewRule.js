import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../util/styled/Modal';
import Button from '../util/styled/Button';

import X from '../svg/icon/X';

class ModalViewRule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.close;
    delete rest.rule;

    if(!this.props.rule)
      return null;

/*
  build: PropTypes.number,
  max: PropTypes.number,
  level: PropTypes.number,
  roleplay: PropTypes.number,
  requires: PropTypes.string,
  requeresAny: PropTypes.string,
  conflicts: PropTypes.string,
  removes: PropTypes.string,
  grants: PropTypes.string,
  grantsUseOf: PropTypes.string,
  increaseMax: PropTypes.string
      return Object.assign({}, rule, {count: count, granted: granted});
  */
    const rule = this.props.rule;
    // grandmastery (5th purchase) isn't discounted
    const build = rule.category == 'Craft' && rule.count >= 4 ? rule.buildBase : rule.build;
    return (
      <Modal close={this.props.close}>
        <div {...rest}>
          <header>
            <h1>{rule.name + (!build ? '' : ` (${build} Build)`)}</h1>
            <Button title='Close Description' label='Close Description' callback={this.props.close} type='background'>
              <X />
            </Button>
          </header>
          <article>
            <p className='category'>{rule.category + (!rule.group ? '' : ': ' + rule.group) + (!rule.tier ? '' : ' (Tier ' + rule.tier + ')')}</p>
            {!rule.race ? null :
              <p className='race'>{'Race: ' + rule.race + (!rule.culture ? '' : ' (' + rule.culture + ')')}</p>
            }
            {!rule.effect ? null : <p className='effect'>{rule.effect}</p>}
            {!rule.delivery ? null : <p className='delivery'>{'Delivery: ' + rule.delivery}</p>}
            {!rule.verbal ? null : <p className='verbal'>{'Verbal: "' + rule.verbal + '"'}</p>}
            {!rule.uses ? null :
              <p className='uses'>{'Uses: ' + rule.uses + ' + ' + (rule.usesExtra || 0)  + ' per ' + (rule.usesPerXAptitudes || 0) + (rule.group == 'Burn' ? '' : ' Combat') + ' Aptitude' + (rule.usesPerXAptitudes > 1 ? 's ' : ' ') + rule.usesType}</p>
            }
          </article>
          <main className='description'>
            {rule.description.split('\n').map((t, i) => <p key={i}>{t}</p>)}
          </main>
        </div>
      </Modal>
    );
  }
}

ModalViewRule.defaultProps = {
  rule: {
    name: 'default',
    build: 0,
    count: 0,
    category: 'default',
    description: 'default'
  }
};

ModalViewRule.propTypes = {
  close: PropTypes.func.isRequired,
  rule: PropTypes.object
};

export default ModalViewRule;
