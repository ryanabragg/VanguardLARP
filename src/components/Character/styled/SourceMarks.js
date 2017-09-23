import styled from 'styled-components';
import Color from 'color';

import SourceMarks from '../SourceMarks';

const StyledSourceMarks = styled(SourceMarks)`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  min-height: 25px;

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
