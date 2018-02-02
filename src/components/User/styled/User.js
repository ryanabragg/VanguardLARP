import styled from 'styled-components';

import { colorOnBackground } from '../../../util/css-helpers';

import User from '../User';

const StyledUser = styled(User)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 1em;
  margin: 0;
  @media (min-width: ${props => props.theme.breakpoints.s + 1}px) {
    margin: 0 0 0 62px;
  }
  @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
    max-width:  ${props => props.theme.breakpoints.l}px;
    width: 80%;
    margin: 10px auto;
  }

  .profile {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-right: 100px;
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
    height: 2em;
    width: 100%;

    label {
      width: 60px;
      @media (min-width: ${props => props.theme.breakpoints.s + 1}px) and (max-width: ${props => props.theme.breakpoints.m}px) {
        width: 70px;
      }
      @media (min-width: ${props => props.theme.breakpoints.m + 1}px) {
        width: 80px;
      }
    }
    p {
      flex-grow: 1;
      margin-right: 5px;
    }
    button {
      margin-right: 15px;
    }
  }

  .prompt {
    flex-wrap: nowrap;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 10vh;
    margin-bottom: 10vh;
    max-height: 500px;
    .header {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 100px;
      padding: 1em;
    }
    .main {
      width: 100%;
      flex-grow: 1;
      padding: 1em;
    }
    .footer {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100px;
      padding: 1em;
    }
  }
`;

export default StyledUser;
