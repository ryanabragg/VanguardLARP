import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import theme from '../../theme';

const HeaderImage = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(logo.svg);
  background-size: contain;
  @media (max-width: ${theme.breakpoints.s}px) {
    height: 240px;
  }
  @media (min-width: ${theme.breakpoints.s + 1}px) and (max-width: ${theme.breakpoints.m}px) {
    height: 300px;
  }
  @media (min-width: ${theme.breakpoints.m + 1}px) {
    height: 360px;
  }
`;

export default HeaderImage;
