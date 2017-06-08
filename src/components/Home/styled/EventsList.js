import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import theme from '../../theme';

const EventsList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    line-height: 1.2em;
    padding: 0.5em;
    background: ${Color(theme.colors.secondary).mix(Color('white'), 0.1).hex()};
  }
  li:nth-child(odd) {
    background: ${Color(theme.colors.secondary).mix(Color('white'), 0.2).hex()};
  }
  li:hover {
    background: ${Color(theme.colors.secondary).mix(Color('white'), 0.3).hex()};
  }
  .location {
    display: inline;
    padding-right: ${.5 / .7}em;
    font-size: 0.7em;
    @media (min-width: ${theme.breakpoints.s + 1}px) and (max-width: ${theme.breakpoints.m}px) {
      float: right;
    }
    @media (min-width: ${theme.breakpoints.l + 1}px) {
      float: right;
    }
  }
  .location:before {
    @media (max-width: ${theme.breakpoints.s}px) {
      content: '';
      display: block;
    }
    @media (min-width: ${theme.breakpoints.m + 1}px) and (max-width: ${theme.breakpoints.l}px) {
      content: '';
      display: block;
    }
  }
`;

export default EventsList;
