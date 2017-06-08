import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import theme from '../../theme';

const Article = styled.article`
  position: relative;
  @media (min-width: ${theme.breakpoints.m + 1}px) {
    width: ${props => props.splitView ? '40%' : '90%'};
    float: left;
    margin-left: 5%;
    margin-right: 5%;
  }
`;

export default Article;
