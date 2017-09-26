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
    delete rest.selected;
    delete rest.onClick;
    delete rest.onChange;
    delete rest.onSubmit;
    delete rest.onCancel;
    delete rest.onDelete;
    delete rest.scrollToForm;
    return (
      <article {...rest}>
        {this.props.list.length == 0
        ? null
        : this.props.list.map(rule => (
          this.props.selected &&
          rule._id == this.props.selected._id
          ? <RuleForm
              key={this.props.selected._id}
              id={this.props.selected._id}
              name={this.props.selected.name}
              build={Number(this.props.selected.build)}
              delivery={this.props.selected.delivery}
              tags={Number(this.props.selected.tags)}
              category={this.props.selected.category}
              group={this.props.selected.group}
              tier={this.props.selected.tier}
              race={this.props.selected.race}
              culture={this.props.selected.culture}
              prodigy={this.props.selected.prodigy}
              description={this.props.selected.description}
              max={Number(this.props.selected.max)}
              extraUses={this.props.selected.extraUses}
              requires={this.props.selected.requires}
              requeresAny={this.props.selected.requeresAny}
              conflicts={this.props.selected.conflicts}
              replaces={this.props.selected.replaces}
              grants={this.props.selected.grants}
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
              group={rule.group + (rule.tier ? ' (' + rule.tier + ')' : '')}
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
  scrollToForm: false
}

RuleList.propTypes = {
  list: PropTypes.array.isRequired,
  selected: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  scrollToForm: PropTypes.bool
};

export default RuleList;
