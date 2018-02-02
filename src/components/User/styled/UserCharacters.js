import styled from 'styled-components';

import { colorOnBackground } from '../../../util/css-helpers';

import UserCharacters from '../UserCharacters';

const StyledUserCharacters = styled(UserCharacters)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  max-width: 400px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => colorOnBackground(props.theme.colors.background, props.theme.alphaLightText.primary, props.theme.alphaDarkText.primary)};
  font-family: ${props => props.theme.font.standard};
  text-decoration: none;
  font-variant: none;
  line-height: 1em;
  font-size: 18px;
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) and (max-width: ${props => props.theme.breakpoints.m}px) {
    font-size: 20px;
  }
  @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
    font-size: 24px;
  }

  ul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  li {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
    font-size: 1.5em;

    button {
      margin-right: 15px;
    }
  }
`;

export default StyledUserCharacters;
