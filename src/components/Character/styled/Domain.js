import styled from 'styled-components';
import Color from 'color';

import Domain from '../Domain';

const StyledDomain = styled(Domain)`
  display: inline-block;
  width: 100%;
  vertical-align: top;
  padding: 9px 9px 3px 9px;
  margin: 10px 0 0 0;
  border: 1px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  border-top: 3px solid ${props => props.theme.colors.secondary};
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
  label.tier {
    display: inline-block;
    position: relative;
    width: 100%;
    font-size: 0.8em;
    text-align: center;
  }
  label.tier::before,
  label.tier::after {
    content: "";
    position: absolute;
    top: 35%;
    width: 20%;
    height: 1px;
    background: ${props => props.theme.colors.secondary};
  }
  label.tier::before {
    left: 20%;
  }
  label.tier::after {
    right: 20%;
  }


  div[data-character="ability"] {
    padding: 0;
    margin: 0 5px 2px 5px;
  }
  span {
    display: inline-block;
  }
  span:hover {
    cursor: pointer;
  }
  input, select {
    margin: 0 5px 0 0;
  }
  input {
    width: 20px;
    border: 1px solid ${props => props.theme.colors.primary};
    text-align: center;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default StyledDomain;
