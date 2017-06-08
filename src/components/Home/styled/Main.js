import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import theme from '../../theme';

const Main = styled.main`
  position: relative;
  margin: auto;
  padding-left: 2em;
  padding-right: 2em;
  max-width: ${theme.breakpoints.l}px;
  color: ${Color(theme.colors.font).mix(Color(theme.colors.background), theme.alpha.primary).hex()};
  color: rgba(${theme.colors.font}, ${theme.alpha.primary});
  font-family: ${theme.font.standard};
  line-height: 1.2;
  font-size: 18px;
  @media (min-width: ${theme.breakpoints.s + 1}px) and (max-width: ${theme.breakpoints.m}px) {
    font-size: 20px;
  }
  @media (min-width: ${theme.breakpoints.m + 1}px) {
    font-size: 24px;
  }
`;

export default Main;
