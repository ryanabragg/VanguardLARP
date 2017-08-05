import styled from 'styled-components';
import Color from 'color';

import Crafting from '../Crafting';

const StyledCrafting = styled(Crafting)`
  display: block;
  padding: 9px 9px 3px 9px;
  margin: 10px 0 0 0;
  border: 1px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  border-top: 3px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  border-radius: 3px;
  label.floating {
    float: left;
    margin-top: -16px;
    background: ${props => props.theme.colors.background};
    padding: 2px;
    color: ${props => {
      let background = Color(props.theme.colors.background).grayscale();
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
    font-size: 0.7em;
    line-height: 1em;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }
  span {
    display: block;
    height: 21px;
    margin: 0 5px 0 0;
  }
  div {
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
