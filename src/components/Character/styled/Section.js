import styled from 'styled-components';
import Color from 'color';

const Section = styled.section`
  @media (min-width: ${props => props.theme.breakpoints.xs + 1}px) {
    max-width: ${props => props.theme.breakpoints.xs}px;
  }
  display: inline-block;
  padding: 0;
  margin: 0 5px 0 5px;
  vertical-align: top;
`;

export default Section;
