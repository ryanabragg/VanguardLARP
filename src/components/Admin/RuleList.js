import React from 'react';
import PropTypes from 'prop-types';

import Rule from './Rule';
import RuleForm from './RuleForm';

class RuleList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.list;
    delete rest.selectedID;
    delete rest.onClick;
    delete rest.onChange;
    delete rest.onSubmit;
    delete rest.onCancel;
    delete rest.onDelete;
    delete rest.scrollToForm;
    return (
      <article {...rest}>
        {this.props.list.length == 0 ? null : this.props.list.map(rule => (
          rule._id == this.props.selectedID
          ? <RuleForm
              key={rule._id}
              id={rule._id}
              name={rule.name}
              build={Number(rule.build)}
              delivery={rule.delivery}
              category={rule.category}
              group={rule.group}
              tier={rule.tier}
              race={rule.race}
              culture={rule.culture}
              description={rule.description}
              max={Number(rule.max)}
              extraUses={rule.extraUses}
              requires={rule.requires}
              requeresAny={rule.requeresAny}
              conflicts={rule.conflicts}
              replaces={rule.replaces}
              grants={rule.grants}
              onChange={this.props.onChange}
              onSubmit={this.props.onSubmit}
              onCancel={this.props.onCancel}
              onDelete={this.props.onDelete}
              scrollToForm={this.props.scrollToForm}
            />
          : <Rule
              key={rule._id}
              id={rule._id}
              name={rule.name}
              category={rule.category}
              group={rule.group}
              tier={rule.tier}
              race={rule.race}
              culture={rule.culture}
              onClick={this.props.onClick}
            />
        ))}
      </article>
    );
  };
}

RuleList.defaultProps = {
  list: [],
  selectedID: '',
  scrollToForm: false
}

RuleList.propTypes = {
  list: PropTypes.array.isRequired,
  selectedID: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  scrollToForm: PropTypes.bool
};

export default RuleList;
