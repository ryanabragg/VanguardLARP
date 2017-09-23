import styled from 'styled-components';
import Color from 'color';

const Section = styled.section`
  max-width: ${props => props.theme.breakpoints.xs}px;
  @media (min-width: ${props => props.theme.breakpoints.xs + 1}px) {
    max-width: ${props => props.theme.breakpoints.s}px;
  }
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) {
    max-width: ${props => props.theme.breakpoints.m}px;
  }
  @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
    max-width: ${props => props.theme.breakpoints.l}px;
  }
  @media (min-width: ${props => props.theme.breakpoints.l + 1}px) {
    max-width: ${props => props.theme.breakpoints.xl}px;
  }
  display: inline-block;
  padding: 0;
  margin: 0 5px 0 5px;
  vertical-align: top;
`;

export default Section;
