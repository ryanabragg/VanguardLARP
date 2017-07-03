import React from 'react';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.dismiss = this.dismiss.bind(this);

    if (this.props.timeoutDuration && this.props.timeoutFunction) {
      this.timeout = setTimeout(
        this.props.timeoutFunction,
        this.props.timeoutDuration
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timeout);
    if (nextProps.timeoutDuration && nextProps.timeoutFunction) {
      this.timeout = setTimeout(
        nextProps.timeoutFunction,
        nextProps.timeoutDuration
      );
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  dismiss() {
    clearTimeout(this.timeout);
    this.props.timeoutFunction();
  }

  render(){
    let dismissButton = this.props.showDismiss === true ? 'DISMISS' : this.props.showDismiss;
    return (
      <div data-notification-type={this.props.type}>
        {this.props.title ? <span data-notification='title'>{this.props.title}</span> : null}
        {this.props.message}
        {this.props.action && this.props.actionClick ? <span data-notification='button' onClick={this.props.actionClick}>{this.props.action}</span> : null}
        {this.props.showDismiss || !this.props.timeoutDuration ? <span data-notification='button' onClick={this.dismiss}>{dismissButton}</span> : null}
      </div>
    );
  }
}

Notification.defaultProps = {
  showDismiss: false,
  type: 'info',
  timeoutDuration: 3000
};

Notification.propTypes = {
  key: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  action: PropTypes.string,
  actionClick: PropTypes.func,
  timeoutDuration: PropTypes.number,
  timeoutFunction: PropTypes.func.isRequired,
  showDismiss: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ])
};

export default Notification;
