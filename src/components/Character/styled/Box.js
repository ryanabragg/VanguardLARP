import styled from 'styled-components';
import Color from 'color';

import { colorOnBackground } from '../../../util/css-helpers';

import Box from '../Box';

const Boxed = styled(Box)`
  position: relative;
  display: inline-block;
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
  margin: 10px 5px 0 5px;
  padding: 9px 9px 3px 9px;
  border: 1px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  border-top: 3px solid ${props => {
    if(props.color == true)
      return props.theme.colors.secondary;
    if(!props.color)
      return Color(props.theme.colors.secondary).grayscale().hex();
    return props.color;
  }};
  border-radius: 3px;
  vertical-align: top;

  label.floating {
    float: left;
    margin-top: -18px;
    background: ${props => Color(props.theme.colors.background).grayscale().hex()};
    padding: 2px;
    color: ${props => colorOnBackground(Color(props.theme.colors.background).grayscale().hex(), props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
    font-size: 13px;
    line-height: 1em;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default Boxed;
