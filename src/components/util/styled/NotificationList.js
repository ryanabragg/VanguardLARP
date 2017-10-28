import styled from 'styled-components';

import { colorOnBackground } from '../../../util/css-helpers';

import NotificationList from '../NotificationList';

const StyledNotificationList = styled(NotificationList)`
  position: fixed;
  top: 1em;
  left: 50%;
  transform: translate(-50%, 0);
  min-width: ${props => props.width || 250}px;
  text-align: center;
  border-radius: 2px;
  //child divs are individual notifications
  div {
    line-height: 2em;
    padding: 0.5em 1em;
    margin-bottom: 5px;
  }
  div.primary {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => colorOnBackground(props.theme.colors.primary, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  div.info {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => colorOnBackground(props.theme.colors.secondary, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  div.accent {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => colorOnBackground(props.theme.colors.accent, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  div.asside {
    background-color: ${props => props.theme.colors.asside};
    color: ${props => colorOnBackground(props.theme.colors.asside, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  div.success {
    background-color: ${props => props.theme.colors.success};
    color: ${props => colorOnBackground(props.theme.colors.success, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  div.warning {
    background-color: ${props => props.theme.colors.warning};
    color: ${props => colorOnBackground(props.theme.colors.warning, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  div.alert {
    background-color: ${props => props.theme.colors.alert};
    color: ${props => colorOnBackground(props.theme.colors.alert, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  }
  span.title {
    margin-right: 0.5em;
    font-weight: bold;
  }
  span.action, span.dismiss {
    margin-left: 0.5em;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default StyledNotificationList;
