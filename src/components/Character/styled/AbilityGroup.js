import styled from 'styled-components';
import Color from 'color';

import AbilityGroup from '../AbilityGroup';

const StyledAbilityGroup = styled(AbilityGroup)`
  display: inline-block;
  vertical-align: top;
  width: 100%;

  div {
    position: relative;
    padding: 0;
    height: 1.2em;
    margin: 0 5px 2px 5px;
  }
  span {
    display: inline-block;
  }
  span:hover {
    cursor: pointer;
  }
  input, select, textarea {
    margin: 0 5px 0 0;
    border: 1px solid ${props => props.theme.colors.primary};
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
