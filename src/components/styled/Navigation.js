import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const Navigation = styled.nav`
  overflow: hidden;
  background: ${props => Color(props.theme.colors.primary).grayscale().hex()};
  width: 100%;
  margin-bottom: 10px;
  a {
    float: left;
    height: 100%;
    padding: 0 0.5em 0 0.5em;
    text-decoration: none;
    font-variant: small-caps;
    text-align: center;
    line-height: 60px;
    font-size: 2em;
    font-family: ${props => props.theme.font.trebuchet};
    color: ${props => {
      let background = Color(props.theme.colors.primary).grayscale();
      let base = Color(background.dark() ? 'white' : 'black');
      let alpha = background.light() ? props.theme.alphaDarkText.primary : props.theme.alphaLightText.primary;
      return base.mix(background, alpha).hex();
    }};
  }
  a:hover {
    color: ${props => props.theme.colors.secondary};
  }
  img {
    height: 40px;
    vertical-align: text-bottom;
  }
  a:last-child {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
  }
  .nav-active {
    color: ${props => props.theme.colors.secondary};
  }
  @media (max-width: ${props => props.theme.breakpoints.s}px) {
    a:first-child {
      float: ${props => props.isMenuHidden ? 'left' : 'none'};
    }
    a:not(:first-child) {
      float: none;
      display: ${props => props.isMenuHidden ? 'none' : 'block'};
      text-align: left;
    }
    a:last-child {
      display: block;
    }
    .nav-active {
      float: left;
      display: block !important;
    }
  }
`;

export default Navigation;
