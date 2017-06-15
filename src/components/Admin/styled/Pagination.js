import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import Pagination from '../../Pagination';

import theme from '../../theme';

const StyledPagination = styled(Pagination)`
  padding: 0;
  margin: 0;
  a {
    display: inline;
    padding: 0.3em 1em;
    border-top: 1px solid ${Color(theme.colors.secondary).mix(Color('grey'), 0.3).hex()};
    border-bottom: 1px solid ${Color(theme.colors.secondary).mix(Color('grey'), 0.3).hex()};
    border-left: 1px solid ${Color(theme.colors.secondary).mix(Color('grey'), 0.3).hex()};
    transition: background-color .3s;
    font-size: 1.2em;
  }
  .current {
    background: ${Color(theme.colors.secondary).mix(Color('white'), 0.3).hex()};
  }
  a:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  a:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: 1px solid ${Color(theme.colors.secondary).mix(Color('grey'), 0.3).hex()};
  }
  a:hover {
    cursor:pointer;
    background: ${Color(theme.colors.secondary).mix(Color('white'), 0.3).hex()};
  }
`;

export default StyledPagination;
