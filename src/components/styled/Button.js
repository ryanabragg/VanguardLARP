import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const Button = styled.button`
  border: ${props => props.border || 'none'};
  background: ${ props => props.theme.colors[props.type] || '#e7e7e7'};
  color: ${props => props.type ? 'white' : 'black'};
  padding: 14px 28px;
  margin: 0;
`;

export default Button;
