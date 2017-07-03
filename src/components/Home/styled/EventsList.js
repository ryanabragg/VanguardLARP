import styled from 'styled-components';
import Color from 'color';

const EventsList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    line-height: 1.2em;
    padding: 0.5em;
    background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.1).hex()};
  }
  li:nth-child(odd) {
    background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.2).hex()};
  }
  li:hover {
    background: ${props => Color(props.theme.colors.secondary).mix(Color('white'), 0.3).hex()};
  }
  .location {
    display: inline;
    padding-right: ${.5 / .7}em;
    font-size: 0.7em;
    @media (min-width: ${props => props.theme.breakpoints.s + 1}px) and (max-width: ${props => props.theme.breakpoints.m}px) {
      float: right;
    }
    @media (min-width: ${props => props.theme.breakpoints.l + 1}px) {
      float: right;
    }
  }
  .location:before {
    @media (max-width: ${props => props.theme.breakpoints.s}px) {
      content: '';
      display: block;
    }
    @media (min-width: ${props => props.theme.breakpoints.m + 1}px) and (max-width: ${props => props.theme.breakpoints.l}px) {
      content: '';
      display: block;
    }
  }
`;

export default EventsList;
