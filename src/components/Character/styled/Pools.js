import styled from 'styled-components';
import Color from 'color';

import Pools from '../Pools';

const StyledPools = styled(Pools)`
  display: inline-block;
  width: 100%;

  .pool-abilities {
    display: block;
    width: 100%;
    padding: 0;
    margin: 5px 0 10px 0;
  }
  .pool-abilities div {
    display: inline-block;
    width: 80px;
    padding: 0;
    margin: 0 0 0 10px;
    font-size: 11px;
  }

  .button:hover {
    cursor: pointer;
  }

  .ability {
    display: flex;
    height: 20px;
  }

  .ability-input {
    display: flex;
    margin: 0 5px 0 0;
    //border: 1px solid ${props => props.theme.colors.primary};
  }
  .ability-input > input,
  .ability-input > div {
    height: 20px;
    width: 20px;
    margin: 0;
    padding: 0;
  }
  .ability-input > input[type="checkbox"] {
    margin-left: 40px;
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

export default StyledPools;
