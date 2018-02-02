import styled from 'styled-components';

import Field from '../Field';

const StyledField = styled(Field)`
  display: inline-block;
  width: 100%;

  height: 30px;

  ${props => {
    if(props.decorated)
      return `padding 0 0.5em;
  border: 1px solid ${props.alert ? props.theme.newtheme.colors.pale.red : props.theme.colors.secondary};`;
    return `border: none;`;
  }}
  outline: none;
  
  background: none;

  font-size: 16px;
  line-height: 30px;

  transition: border 0.3s;

  :focus {
    border-bottom: solid 1px ${props => props.alert ? props.theme.newtheme.colors.pale.red : props.theme.colors.secondary};
    ${props => {
      if(props.decorated)
        return `box-shadow: 0 2px 7px ${props.alert ? props.theme.newtheme.colors.pale.red : props.theme.colors.secondary};`;
      return ``;
    }}
  }

  //textarea
  resize:none;
`;

export default StyledField;
