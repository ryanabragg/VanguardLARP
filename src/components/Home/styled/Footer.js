import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import theme from '../../theme';

const Footer = styled.footer`
  float: left;
  position: relative;
  font-size: 0.8em;
  line-height: 1em;
  width: 100%;
  height: 100px;
  background: ${theme.colors.secondary};
  background: linear-gradient(180deg, white, ${Color(theme.colors.secondary).mix(Color('black')).hex()});
  p {
    position: absolute;
    right: 5%;
    bottom: 10px;
  }
`;

export default Footer;
