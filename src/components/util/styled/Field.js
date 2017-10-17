import styled from 'styled-components';

import Field from '../Field';

const StyledField = styled(Field)`
  display: inline-block;
  width: 100%;

  height: 30px;

  border: none;
  outline: none;
  
  background: none;

  font-size: 16px;
  line-height: 30px;

  transition: border 0.3s;

  :focus {
    border-bottom: solid 1px ${props => props.theme.colors.secondary};
  }

  //textarea
  resize:none;
`;

export default StyledField;
