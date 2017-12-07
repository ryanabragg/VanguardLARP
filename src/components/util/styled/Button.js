import styled from 'styled-components';

import { colorOnBackground } from '../../../util/css-helpers';

import Button from '../Button';

const StyledButton = styled(Button)`
  height: ${props => props.height || props.size || '32px'};
  width: ${props => props.width || props.size || '32px'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  background: ${props => {
    if(props.disabled)
      return props.theme.colors.grey;
    return props.color || props.theme.colors[props.type || 'primary'];
  }};
  color: ${props => {
    if(props.disabled)
      return props.theme.colors.white;
    let color = props.color || props.theme.colors[props.type || 'primary'];
    return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
  }};
  fill: ${props => {
    if(props.disabled)
      return props.theme.colors.white;
    let color = props.color || props.theme.colors[props.type || 'primary'];
    return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
  }};
  border-radius: ${props => props.radius || '0px'};
  border: none;
  ${props => props.shadow ? 'box-shadow: 4px 8px 16px rgba(0,0,0,0.4);' : ''}

  :hover {
    ${props => props.disabled ? '' : 'cursor: pointer;'}
    background: ${props => {
      if(props.disabled)
        return props.theme.colors.grey;
      return props.color || props.theme.colors[props.type || 'accent'];
    }};
    color: ${props => {
      if(props.disabled)
        return props.theme.colors.white;
      let color = props.color || props.theme.colors[props.type || 'accent'];
      return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
    }};
    fill: ${props => {
      if(props.disabled)
        return props.theme.colors.white;
      let color = props.color || props.theme.colors[props.type || 'accent'];
      return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
    }};
  }
  :focus {
    background: ${props => {
      if(props.disabled)
        return props.theme.colors.grey;
      return props.color || props.theme.colors[props.type || 'accent'];
    }};
    color: ${props => {
      if(props.disabled)
        return props.theme.colors.white;
      let color = props.color || props.theme.colors[props.type || 'accent'];
      return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
    }};
    fill: ${props => {
      if(props.disabled)
        return props.theme.colors.white;
      let color = props.color || props.theme.colors[props.type || 'accent'];
      return colorOnBackground(color, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)
    }};
  }

  ${props => props.custom || ''}
`;

export default StyledButton;
