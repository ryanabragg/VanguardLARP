import styled from 'styled-components';
import Color from 'color';

import Racials from '../Racials';

const StyledRacials = styled(Racials)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 30px;

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

  .button {
    transition-duration: 0.2s;
    border-radius: 50%;
  }

  .button:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.asside};
  }
  .button:hover svg {
    fill: white;
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
    height: 20px;
    width: 20px;
    margin: 5px 10px 5px 70px;
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
    background: none;
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
