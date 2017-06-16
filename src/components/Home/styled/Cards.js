import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import theme from '../../theme';

const Cards = styled.div`
  float: right;
  margin-bottom: 1em;
  margin-left: 1em;
  @media (max-width: ${theme.breakpoints.m}px) {
    width: 100%;
    margin-left: 0;
  }
`;

export default Cards;
