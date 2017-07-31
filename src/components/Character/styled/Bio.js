import styled from 'styled-components';
import Color from 'color';

import Bio from '../Bio';

const StyledBio = styled(Bio)`
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) {
    max-width: ${props => props.theme.breakpoints.xs}px;
  }
  display: inline-block;
  padding: 10px;
  margin: 0;
  div {
    display: inline-block;
    width: 100%;
    padding: 9px;
    border: 1px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
    margin-bottom: 10px;
    border-radius: 3px;
  }
  div.x3 {
    width: 30%;
    margin-right: 5%;
  }
  div.x3e {
    width: 30%;
    margin-right: 0;
  }
  div.x4 {
    width: 20%;
    margin-right: 6.66%;
  }
  div.x4e {
    width: 20%;
    margin-right: 0;
  }
  label {
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
  span {
    background: ${props => Color(props.theme.colors.secondary).grayscale().hex()};
    display: block;
    padding: 3px;
    margin: 0 -9px -9px -9px;
    text-align: center;
    color: ${props => {
      let background = Color(props.theme.colors.secondary).grayscale();
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
  }
  span.edit {
    background: ${props => Color(props.theme.colors.secondary).hex()};
    color: ${props => {
      let background = Color(props.theme.colors.secondary);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
  }
  textarea{
    resize:none;
  }
  input,
  textarea,
  select {
    width: 100%;
    height: 25px;
    line-height: 25px;
    padding: 0;
    border: none;
    outline: none;
  }
  input:focus,
  textarea:focus,
  select:focus {
  }
`;

export default StyledBio;
