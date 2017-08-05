import styled from 'styled-components';
import Color from 'color';

import SourceMarks from '../SourceMarks';

const StyledSourceMarks = styled(SourceMarks)`
  display: inline-block;
  width: 100%;
  padding: 9px 9px 3px 9px;
  margin: 10px 0 0 0;
  border: 1px solid ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  border-top: 3px solid ${props => {let color = Color(props.theme.colors.secondary); return props.limit > 0 ? color.hex() : color.grayscale().hex();}};
  border-radius: 3px;
  label.floating {
    float: left;
    margin-top: -16px;
    background: ${props => Color(props.theme.colors.background).grayscale().hex()};
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
  div {
    display: block;
    width: 100%;
  }
  ul {
    display: block;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: inline-block;
    margin: 5px 3px 0 0;
  }
  .mastery select {
    color: ${props => Color(props.theme.colors.secondary).grayscale().hex()};
  }
  input {
    margin: 0 3px 0 3px;
    width: 100px;
  }
`;

export default StyledSourceMarks;
