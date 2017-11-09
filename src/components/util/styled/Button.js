import styled from 'styled-components';

import { colorOnBackground } from '../../../util/css-helpers';

import Button from '../Button';

const StyledButton = styled(Button)`
  height: ${props => props.height || props.size || '32px'};
  width: ${props => props.width || props.size || '32px'};
  padding: 4px;
  background: ${props => {
    return props.color || props.theme.colors[props.type || 'primary'];
  }};
  color: ${props => {
    let color = props.color || props.theme.colors[props.type || 'primary'];
    return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
  }};
  fill: ${props => {
    let color = props.color || props.theme.colors[props.type || 'primary'];
    return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
  }};
  border-radius: ${props => props.radius || '0px'};
  border: none;
  ${props => props.shadow ? 'box-shadow: 4px 8px 16px rgba(0,0,0,0.4);' : ''}

  :hover {
    cursor: pointer;
  }
  :focus {
    color: ${props => {
      let color = props.color || props.theme.colors[props.type || 'asside'];
      return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
    }};
    fill: ${props => {
      let color = props.color || props.theme.colors[props.type || 'asside'];
      return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
    }};
  }

  ${props => props.custom || ''}
`;

export default StyledButton;
