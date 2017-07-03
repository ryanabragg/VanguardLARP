import React from 'react';
import styled from 'styled-components';
import Color from 'color';

const Card = styled.div`
  float: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
  transition: 0.3s;
  height: 8em;
  @media (max-width: ${props => props.theme.breakpoints.m}px) {
    width: 50%;
  }
  @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
    width: 8em;
  }
  svg {
    display: block;
    margin: 0 auto;
    height: 80%;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
  p {
    width: 100%;
    padding-left: 0.5em;
    padding-right: 0.5em;
    margin: 0px;
    text-align: center;
    font-size: .8em;
  }
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default Card;
