import styled from 'styled-components';
import Color from 'color';

import Box from '../Box';

const Boxed = styled(Box)`
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 10px 5px 0 5px;
  width: ${props => {
    let width = props.width || 'xs';
    let factor = props.factor || 1;
    switch(width){
    case 'xl':
      width = props.theme.breakpoints.xl; break;
    case 'l':
      width = props.theme.breakpoints.l; break;
    case 'm':
      width = props.theme.breakpoints.m; break;
    case 's':
      width = props.theme.breakpoints.s; break;
    case 'xs':
      width = props.theme.breakpoints.xs; break;
    default:
      width = typeof width == 'number' ? width : props.theme.breakpoints.xs;
    }
    return (width * factor) - 10; // left and right margin pixels
  }}px;
  padding: 9px 9px 3px 9px;
  border: 1px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  border-top: 3px solid ${props => {
    let color = props.color == true
    ? Color(props.theme.colors.secondary)
    : !props.color
    ? Color(props.theme.colors.secondary).grayscale()
    : Color(props.color);
    return color.hex();
  }};
  border-radius: 3px;
  label.floating {
    float: left;
    margin-top: -16px;
    background: ${props => Color(props.theme.colors.background).grayscale().hex()};
    padding: 2px;
    color: ${props => {
      let background = Color(props.theme.colors.background).grayscale();
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
    font-size: 0.7em;
    line-height: 1em;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default Boxed;
