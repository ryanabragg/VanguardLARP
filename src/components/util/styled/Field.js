import styled from 'styled-components';
import Color from 'color';

import Field from '../Field';

const StyledField = styled(Field)`
  display: inline-block;
  width: 100%;

  input,
  textarea,
  select {
    width: 100%;
    height: 25px;
    line-height: 25px;
    border: none;
    outline: none;
  }
  input:focus,
  textarea:focus,
  select:focus {
  }
  textarea{
    resize:none;
  }
`;

export default StyledField;
