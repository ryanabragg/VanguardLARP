import styled from 'styled-components';
import Color from 'color';

import Crafting from '../Crafting';

const StyledCrafting = styled(Crafting)`
  display: inline-block;
  width: 100%;

  span {
    display: block;
    height: 21px;
    margin: 0 5px 0 0;
  }
  div {
    font-size: 0.8em;
    display: inline-block;
    vertical-align: top;
  }
  div.stone {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: 0 1px 0 0;
    padding: 0;
    text-align: center;
    font-size: 0.8em;
    line-height: 19px;
  }
  div.black {
    color: white;
    background: black;
  }
  div.red {
    color: white;
    background: red;
  }
  div.blue {
    color: white;
    background: blue;
  }
  div.white {
    color: black;
    background: white;
  }
  div.disabled {
    color: #AAA;
    background: #666;
  }
  div.plus,
  div.and,
  div.equals {
    color: black;
    background: white;
    border: 1px solid ${props => props.theme.colors.background};
  }
`;

export default StyledCrafting;
