import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const NotificationList = styled.div`
  //parent div
  position: fixed;
  top: 1em;
  left: 50%;
  transform: translate(-50%, 0);
  min-width: ${props => props.width || 250}px;
  text-align: center;
  //background-color: ${props => Color(props.theme.colors.primary).grayscale().hex()};
  //color: ${props => Color(Color(props.theme.colors.primary).grayscale().dark() ? 'white' : 'black').mix(Color(props.theme.colors.primary).grayscale(), props.theme.alpha.primary).hex()};
  border-radius: 2px;
  //child divs by data-notification-type
  div {
    line-height: 2em;
    padding: 0.5em 1em;
    margin-bottom: 5px;
  }
  div[data-notification-type=primary] {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => Color(Color(props.theme.colors.primary).dark() ? 'white' : 'black').mix(Color(props.theme.colors.primary), props.theme.alpha.primary).hex()};
  }
  div[data-notification-type=info] {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => Color(Color(props.theme.colors.secondary).dark() ? 'white' : 'black').mix(Color(props.theme.colors.secondary), props.theme.alpha.primary).hex()};
  }
  div[data-notification-type=accent] {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => Color(Color(props.theme.colors.accent).dark() ? 'white' : 'black').mix(Color(props.theme.colors.accent), props.theme.alpha.primary).hex()};
  }
  div[data-notification-type=asside] {
    background-color: ${props => props.theme.colors.asside};
    color: ${props => Color(Color(props.theme.colors.asside).dark() ? 'white' : 'black').mix(Color(props.theme.colors.asside), props.theme.alpha.primary).hex()};
  }
  div[data-notification-type=success] {
    background-color: ${props => props.theme.colors.success};
    color: ${props => Color(Color(props.theme.colors.success).dark() ? 'white' : 'black').mix(Color(props.theme.colors.success), props.theme.alpha.primary).hex()};
  }
  div[data-notification-type=warning] {
    background-color: ${props => props.theme.colors.warning};
    color: ${props => Color(Color(props.theme.colors.warning).dark() ? 'white' : 'black').mix(Color(props.theme.colors.warning), props.theme.alpha.primary).hex()};
  }
  div[data-notification-type=alert] {
    background-color: ${props => props.theme.colors.alert};
    color: ${props => Color(Color(props.theme.colors.alert).dark() ? 'white' : 'black').mix(Color(props.theme.colors.alert), props.theme.alpha.primary).hex()};
  }
  span[data-notification=title] {
    margin-right: 0.5em;
    font-weight: bold;
  }
  span[data-notification=button] {
    margin-left: 0.5em;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default NotificationList;
