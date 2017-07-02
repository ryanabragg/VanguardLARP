import React from 'react';

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
    console.log(this.props.actionClick);
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

//Notification.propTypes = defaultPropTypes;

Notification.defaultProps = {
  showDismiss: false,
  type: 'info',
  timeoutDuration: 3000
};

export default Notification;