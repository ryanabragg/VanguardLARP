import styled from 'styled-components';
import Color from 'color';

import Player from '../Player';

const StyledPlayer = styled(Player)`
  clear: both;
  display: block;
  max-width: ${props => props.theme.breakpoints.xs}px;
  padding: 0;
  margin: 0;
  div, input {
    float: left;
    height: 26px;
    width: 73.25%;
    padding: 2px;
    margin-bottom: 5px;
    margin-left: 1%;
    line-height: 22px;
  }
  div {
    border: 1px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  }
  input {
    border: 1px solid ${props => props.theme.colors.primary};
  }
  .number {
    float: right;
    width: 23.75%;
    margin-right: 1%;
    text-align: center;
  }
`;

export default StyledPlayer;
