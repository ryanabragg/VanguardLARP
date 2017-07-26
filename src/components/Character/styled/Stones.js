import styled from 'styled-components';
import Color from 'color';

import Stones from '../Stones';

const StyledStones = styled(Stones)`
  clear: both;
  display: block;
  max-width: 300px;
  height: 50px;
  padding: 0;
  margin: 0;
  label {
    display: block;
    margin: 0 0 2px 0;
  }
  div {
    float: left;
    width: 20px;
    height: 20px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin: 0 1px 5px 0;
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
