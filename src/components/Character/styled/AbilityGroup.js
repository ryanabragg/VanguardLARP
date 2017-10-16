import styled from 'styled-components';
import Color from 'color';

import AbilityGroup from '../AbilityGroup';

const StyledAbilityGroup = styled(AbilityGroup)`
  display: flex;
  flex-direction: column;
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

export default StyledAbilityGroup;
