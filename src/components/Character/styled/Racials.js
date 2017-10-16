import styled from 'styled-components';
import Color from 'color';

import Racials from '../Racials';

const StyledRacials = styled(Racials)`
  display: inline-block;
  width: 100%;

  label.option {
    display: block;
    margin: 5px 0 0 0;
  }

  div.divider {
    margin: 3px 0;
    height: 1px;
    width: 100%;
    background-color: ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  }

  .button:hover {
    cursor: pointer;
    z-index: 1;
    border-radius: 25px;
    box-shadow: 4px 8px 16px 0px rgba(0,0,0,0.2);
  }

  .ability {
    display: flex;
    margin: 0 0 3px 0;
  }

  .ability-input {
    display: flex;
    height: 30px;
    margin: 0 5px 0 0;
  }
  .ability-input svg {
    height: 24px;
    width: 24px;
    margin: 3px;
    padding: 0;
    fill: ${props => props.theme.colors.asside};
  }
  .ability-input > input {
    height: 30px;
    width: 40px;
    margin: 0;
    padding: 0;
    line-height: 30px;
  }
  .ability-input > input[type="checkbox"] {
    margin-left: 60px;
  }

  label {
    font-size: 18px;
    line-height: 30px;
  }

  input,
  select,
  textarea {
    border: none;
    font-size: 15px;
    line-height: 20px;
  }
  input {
    width: 20px;
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

export default StyledRacials;
