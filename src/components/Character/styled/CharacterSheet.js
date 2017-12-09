import styled from 'styled-components';

import CharacterSheet from '../CharacterSheet';

const StyledCharacterSheet = styled(CharacterSheet)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  //flex-direction: row;
  //align-items: center;
  //justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) {
    margin: 0 0 0 62px;
  }
  @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
    max-width:  ${props => props.theme.breakpoints.l}px;
    width: 80%;
    margin: 10px auto;
  }
`;

export default StyledCharacterSheet;
