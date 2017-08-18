import React from 'react';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.dismiss = this.dismiss.bind(this);
    this.action = this.action.bind(this);

    if(this.props.timeoutDuration > 0)
      this.timeout = setTimeout(
        this.dismiss,
        this.props.timeoutDuration
      );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.timeoutDuration != this.props.timeoutDuration) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    if(nextProps.timeoutDuration > 0)
      this.timeout = setTimeout(
        this.dismiss,
        nextProps.timeoutDuration
      );
  }

  componentWillUnmount() {
    if(this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  dismiss() {
    if(this.timeout) 
      clearTimeout(this.timeout);
    if(this.timeout && typeof this.props.timeoutFunction === 'function')
      this.props.timeoutFunction();
    this.timeout = undefined;
    this.props.dismiss(this.props.id);
  }

  action() {
    if(this.timeout)
      clearTimeout(this.timeout);
    this.timeout = undefined;
    if(typeof this.props.actionFunction === 'function')
      this.props.actionFunction(this.props.actionParam);
    this.dismiss();
  }

  render(){
    return (
      <div className={this.props.type}>
        {this.props.title
        ? <span className='title'>{this.props.title}</span>
        : null}
        {this.props.message}
        {this.props.action && this.props.actionFunction
        ? <span className='action' onClick={this.action}>{this.props.action}</span>
        : null}
        {this.props.showDismiss || this.props.timeoutDuration <= 0
        ? <span className='dismiss' onClick={this.dismiss}>
            {this.props.showDismiss === true
            ? 'DISMISS'
            : this.props.showDismiss || 'DISMISS'}
          </span>
        : null}
      </div>
    );
  }
}

Notification.defaultProps = {
  type: 'info',
  timeoutDuration: 3000,
  showDismiss: false
};

Notification.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  action: PropTypes.string,
  actionFunction: PropTypes.func,
  actionParam: PropTypes.any,
  timeoutDuration: PropTypes.number,
  timeoutFunction: PropTypes.func,
  dismiss: PropTypes.func.isRequired,
  showDismiss: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ])
};

export default Notification;
