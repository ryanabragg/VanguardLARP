import styled from 'styled-components';

import Stones from '../Stones';

const StyledStones = styled(Stones)`
  display: inline-block;
  width: 100%;
  min-height: 30px;

  div {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: 0 1px 0 0;
    padding: 0;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
  }
  ${props => typeof props.stoneClick == 'function' ? 'div:hover { cursor: pointer; }' : ''}
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
    border: none;
  }
`;

export default StyledStones;
