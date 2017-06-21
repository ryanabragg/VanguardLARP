import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const Main = styled.main`
  position: relative;
  margin: auto;
  padding-left: 2em;
  padding-right: 2em;
  max-width: ${props => props.theme.breakpoints.l}px;
  color: ${props => Color(props.theme.colors.font).mix(Color(props.theme.colors.background), props.theme.alpha.primary).hex()};
  color: rgba(${props => props.theme.colors.font}, ${props => props.theme.alpha.primary});
  font-family: ${props => props.theme.font.standard};
  line-height: 1.2;
  font-size: 18px;
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) and (max-width: ${props => props.theme.breakpoints.m}px) {
    font-size: 20px;
  }
  @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
    font-size: 24px;
  }
`;

export default Main;
