import styled from 'styled-components';
import Color from 'color';

import Bio from '../Bio';

const StyledBio = styled(Bio)`
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) {
    max-width: ${props => props.theme.breakpoints.xs}px;
  }
  display: inline-block;
  padding: 0;
  margin: 0;
  div {
    position: relative;
    display: inline-block;
    width: 100%;
    padding: 9px 0 0 0;
    border: 1px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
    border-bottom: 3px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
    margin-top: 10px;
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
  div.edit {
    border-bottom: 3px solid ${props => props.theme.colors.secondary};
  }
  label {
    float: left;
    margin: -16px 0 0 3px;
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
    background: ${props => props.theme.colors.secondary};
    display: block;
    text-align: center;
    color: ${props => {
      let background = Color(props.theme.colors.secondary);
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
  }
  button {
    position: absolute;
    top: 9px;
    right: 10px;
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
    padding: 0 3px 0 3px;
    border: none;
    outline: none;
  }
  input:focus,
  textarea:focus,
  select:focus {
  }
`;

export default StyledBio;
