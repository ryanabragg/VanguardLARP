import styled from 'styled-components';
import Color from 'color';

import Stones from '../Stones';

const StyledStones = styled(Stones)`
  display: block;
  max-width: 300px;
  height: 20px;
  padding: 0;
  margin: 0;
  div {
    float: left;
    width: 20px;
    height: 20px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: auto;
    text-align: center;
    font-size: 0.8em;
    line-height: 19px;
  }
  div:hover {
    cursor: pointer;
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
`;

export default StyledStones;
