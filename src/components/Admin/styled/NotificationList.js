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
  border-radius: 2px;
  //child divs by data-notification-type
  div {
    line-height: 2em;
    padding: 0.5em 1em;
    margin-bottom: 5px;
  }
  div[data-notification-type=primary] {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => {
      let background = Color(props.theme.colors.primary);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
  }
  div[data-notification-type=info] {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => {
      let background = Color(props.theme.colors.secondary);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
  }
  div[data-notification-type=accent] {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => {
      let background = Color(props.theme.colors.accent);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
  }
  div[data-notification-type=asside] {
    background-color: ${props => props.theme.colors.asside};
    color: ${props => {
      let background = Color(props.theme.colors.asside);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
  }
  div[data-notification-type=success] {
    background-color: ${props => props.theme.colors.success};
    color: ${props => {
      let background = Color(props.theme.colors.success);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
  }
  div[data-notification-type=warning] {
    background-color: ${props => props.theme.colors.warning};
    color: ${props => {
      let background = Color(props.theme.colors.warning);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
  }
  div[data-notification-type=alert] {
    background-color: ${props => props.theme.colors.alert};
    color: ${props => {
      let background = Color(props.theme.colors.alert);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
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
