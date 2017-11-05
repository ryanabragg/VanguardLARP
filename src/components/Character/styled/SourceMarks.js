import styled from 'styled-components';
import Color from 'color';

import SourceMarks from '../SourceMarks';

const StyledSourceMarks = styled(SourceMarks)`
  display: inline-block;
  width: 100%;
  min-height: 30px;

  ul {
    display: block;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  li {
    display: inline-block;
    margin: 5px 10px 0 0;
  }

  select {
    display: block;
    width: 100%;
  }

  label {

  }

  div.customize {
    display: block;
    margin: 10px 0;
  }

  input {
    margin: 0 5px;
    padding: 0 3p;
    width: 100px;
  }
`;

export default StyledSourceMarks;
