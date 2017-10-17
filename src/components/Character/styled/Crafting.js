import styled from 'styled-components';

import Crafting from '../Crafting';

const StyledCrafting = styled(Crafting)`
  display: inline-block;
  width: 100%;

  span {
    display: block;
    height: 20px;
    margin: 0 5px 0 0;
  }
  div {
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    vertical-align: top;
  }
  div.stone {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: 3px 2px 3px 0;
    padding: 0;
    text-align: center;
    font-size: 12px;
    line-height: 14px;
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
