import styled from 'styled-components';
import Color from 'color';

import Pools from '../Pools';

const StyledPools = styled(Pools)`
  display: inline-block;
  vertical-align: top;
  width: 100%;

  div[data-character="pool-abilities"] {
    display: block;
    width: 100%;
    padding: 0;
    margin: 5px 0 10px 0;
  }
  div[data-character="pool-abilities"] > div {
    display: inline-block;
    width: 80px;
    padding: 0;
    margin: 0 0 0 10px;
    font-size: 11px;
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

export default StyledPools;
