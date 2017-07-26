import styled from 'styled-components';
import Color from 'color';

import AbilityGroup from '../AbilityGroup';

const StyledAbilityGroup = styled(AbilityGroup)`
  clear: both;
  display: inline-block;
  vertical-align: top;
  max-width: 300px;
  padding: 0;
  margin: 0;
  span {
    display: block;
  }
  div {
    padding: 0;
    height: 1.2em;
    margin: 0 5px 2px 5px;
  }
  label.ability {
    display: inline;
  }
  label.ability:hover {
    cursor: pointer;
  }
  input {
    width: 20px;
    margin: 0 5px 0 0;
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

export default StyledAbilityGroup;
