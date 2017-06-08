import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import theme from '../../theme';

const Header = styled.header`
  background: ${theme.colors.secondary};
  background: linear-gradient(0deg, white, ${Color(theme.colors.secondary).mix(Color('black')).hex()});
  width: 100%;
  padding-top: 20px;
  padding-bottom: 100px;
`;

export default Header;
