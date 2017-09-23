import styled from 'styled-components';
import Color from 'color';

import Domain from '../Domain';

const StyledDomain = styled(Domain)`
  display: inline-block;
  vertical-align: top;
  width: 100%;

  div.tier {
    display: block;
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
