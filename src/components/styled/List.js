import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const List = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    line-height: 1.2em;
    padding: 0.5em;
    background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.1).hex()};
  }
  li:nth-child(odd) {
    background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.2).hex()};
  }
  li:last-child {
    margin-bottom: 0.5em;
  }
  li:hover {
    background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.3).hex()};
  }
`;

export default List;
