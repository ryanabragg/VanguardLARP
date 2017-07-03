import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const Main = styled.main`
  position: relative;
  margin: auto;
  padding-left: 2em;
  padding-right: 2em;
  max-width: ${props => props.theme.breakpoints.l}px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => {
    let background = Color(props.theme.colors.background);
    let base = Color(background.dark() ? 'white' : 'black');
    let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
    return base.mix(background, alpha).hex();
  }};
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
